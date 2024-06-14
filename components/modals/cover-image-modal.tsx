"use client"

import { useCoverImage } from "@/app/hooks/use-cover-image"
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const CoverImageModal = () => {
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {edgestore} = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const update = useMutation(api.documents.update);

    const onClose = () =>{
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }
    const onChange = async(file?: File)=>{
        if(file) {
            setIsSubmitting(true);
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
                }
            });
            await update ({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            })

            onClose();
        }
    }

    return(
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange}>
                </SingleImageDropzone>
            </DialogContent>
        </Dialog>
    );
};