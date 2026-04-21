import SeeMoreStore from "@/store/seeMore.store";
import Modal, { closeModal } from "./ui/Modal";
import { X } from "lucide-react";

const SeeMore = () => {
  const { string1, string2, string3, array1 } = SeeMoreStore();
  return (
    <Modal id="more">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">{string1}</h1>
          <button
            className="btn btn-square btn-ghost"
            onClick={() => closeModal("more")}
          >
            <X />
          </button>
        </div>
        <div
          className={
            array1?.length && array1.length > 0
              ? "p-5 rounded-2xl bg-base-200 mt-5"
              : "hidden"
          }
        >
          {array1?.map((item) => (
            <div className="flex flex-row gap-2 my-2">
              <h1>{item.subLabel}</h1> -
              <div className="flex flex-wrap gap-1">
                <span className={item.read ? "badge badge-primary" : "hidden"}>
                  Read
                </span>
                <span className={item.create ? "badge badge-info" : "hidden"}>
                  Create
                </span>
                <span
                  className={item.update ? "badge badge-warning" : "hidden"}
                >
                  Update
                </span>
                <span className={item.delete ? "badge badge-error" : "hidden"}>
                  Delete
                </span>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-1xl font-medium mt-5">{string2}</h2>
        <p className="text-base font-normal">{string3}</p>
      </div>
    </Modal>
  );
};

export default SeeMore;
