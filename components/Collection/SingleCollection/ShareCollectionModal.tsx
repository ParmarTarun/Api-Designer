import Modal from "@/components/Shared/Modal";
import { beautify, formatCollection } from "@/lib/utils";
import { collectionType } from "@/models/Collection";
import React, { FC } from "react";
import { IoDownloadOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

interface ShareCollectionModalProps {
  collection: collectionType;
  close: () => void;
}

const ShareCollectionModal: FC<ShareCollectionModalProps> = ({
  collection,
  close,
}) => {
  const downloadCollection = async () => {
    const formattedData = formatCollection(collection);
    const blob = new Blob([formattedData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${collection.name}.json`;
    link.href = url;
    link.click();
  };
  const jsonBody = beautify(formatCollection(collection));
  return (
    <Modal>
      <div className="text-left bg-secondary rounded-md w-2/5">
        <div className="bg-primary text-secondary px-4 py-2 flex items-center justify-between">
          <h4>Share collection</h4>
          <button onClick={close}>
            <IoMdClose />
          </button>
        </div>
        <div className="overflow-y-scroll h-[80vh] p-2">
          <pre id="json">{jsonBody}</pre>
        </div>
        <div className="bg-primary  px-4 py-2 text-2xl">
          <button
            className="flex items-center gap-2 bg-lightHighlight rounded-md text-primary px-2 py-1 ml-auto"
            onClick={downloadCollection}
          >
            <IoDownloadOutline className="font-semibold" />
            Download
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareCollectionModal;
