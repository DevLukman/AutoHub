export const dynamic = "force-dynamic";
import { getUserSession } from "@/lib/actions/getSession";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 6,
    },
  })
    .middleware(async () => {
      const session = await getUserSession();
      if (!session) throw new Error("Unauthorized");
      return { session };
    })
    .onUploadComplete(async ({ metadata }) => {
      try {
        return { uploadedBy: metadata.session.user.id };
      } catch (error) {
        console.error("Error occur with uploading", error);
        throw new Error("There is error with uploading");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
