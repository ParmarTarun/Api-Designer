import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Modal from "../Shared/Modal";
import { IoMdClose } from "react-icons/io";
import { MdContentCopy, MdEmail, MdPassword } from "react-icons/md";

interface GuestCredsModalProps {
  close: () => void;
}

const GuestCredsModal: FC<GuestCredsModalProps> = ({ close }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(email);
    setTimeout(() => setCopied(false), 3000);
  };

  const email = "test@example.com";
  const password = "1234";

  return (
    <Modal>
      <div className="text-left bg-secondary rounded-md w-2/5">
        <div className="bg-primary text-secondary px-4 py-2 flex items-center justify-between">
          <h4>Guest User</h4>
          <button onClick={close}>
            <IoMdClose />
          </button>
        </div>
        <div className="p-4">
          <h5 className="text-primary">
            Please use the following Creds for guest login
          </h5>
          <p>
            <i>Click on the Get Started button and login via email</i>
          </p>
          <div className="text-left mt-4 flex flex-col text-primary font-bold w-max m-auto">
            <p className="text-xl">
              <MdEmail className="inline mr-2" />
              {email}
              {!copied ? (
                <MdContentCopy
                  className="inline cursor-pointer ml-2"
                  onClick={handleCopy}
                />
              ) : (
                <i className="font-normal text-md ml-2">Copied!</i>
              )}
            </p>
            <p className="text-xl">
              <MdPassword className="inline mr-2" />
              {password}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GuestCredsModal;
