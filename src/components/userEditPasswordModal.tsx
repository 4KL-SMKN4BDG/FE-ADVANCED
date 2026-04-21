import { ArrowLeft } from "lucide-react";
import Input from "./ui/InputField";
import Modal, { closeModal, openModal } from "./ui/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserType } from "@/type/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserShcema } from "@/schema/user";
import userStore from "@/store/user.store";
import idStore from "@/store/id.store";
import { useEffect } from "react";

const UserEditPasswordModal = () => {
  const { selectedId, setSelectedId } = idStore();
  const { updateUser, getData } = userStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserType>({
    defaultValues: {
      email: getData?.email,
      fullName: getData?.fullName,
      password: "",
      confirm_password: "",
      phoneWA: getData?.phoneWA,
      nik: getData?.nik.toString(),
      divisionId: getData?.divisionId,
    },
    resolver: yupResolver(UserShcema),
  });

  const onSubmit: SubmitHandler<UserType> = async (value) => {
    await updateUser(selectedId, value);
    setSelectedId("");
    closeModal("edit-password");
    reset({
      email: getData?.email,
      fullName: getData?.fullName,
      password: "",
      confirm_password: "",
      phoneWA: getData?.phoneWA,
      nik: getData?.nik.toString(),
      divisionId: getData?.divisionId,
    });
  };

  useEffect(() => {
    if (getData) {
      reset({
        email: getData.email,
        fullName: getData.fullName,
        password: "",
        confirm_password: "",
        phoneWA: getData.phoneWA,
        nik: getData.nik.toString(),
        divisionId: getData.divisionId,
      });
    }
  }, [getData, reset]);

  return (
    <Modal id="edit-password">
      <button
        className="btn btn-ghost p-1"
        onClick={() => {
          closeModal("edit-password");
          openModal("user");
          reset({
            password: "",
            confirm_password: "",
          });
        }}
      >
        <ArrowLeft /> <p>Back</p>
      </button>
      <h1 className="text-2xl font-semibold mt-3">Change Password</h1>
      <p className="text-lg">{getData?.fullName}</p>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password</legend>
        <div>
          <Input
            icon="password"
            type="password"
            placeholder="Password"
            error={errors?.password}
            {...register("password")}
          />
        </div>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Repeat Password</legend>
        <div>
          <Input
            icon="password"
            type="password"
            placeholder="Repeat Password"
            error={errors?.confirm_password}
            {...register("confirm_password")}
          />
        </div>
      </fieldset>
      <div className="flex justify-end mt-3">
        <button className="btn btn-secondary" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default UserEditPasswordModal;
