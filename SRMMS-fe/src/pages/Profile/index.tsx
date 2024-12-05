import { useState } from "react";
import ProfilePage from "./components/Information";
import ProfileLayout from "./components/ProfileLayout";
import ChangePasswordPage from "./components/ChangePassword";

const SettingProfile = () => {
  const [selectedKey, setSelectedKey] = useState("profile");
  return (
    <ProfileLayout selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
      {selectedKey === "profile" ? <ProfilePage /> : <ChangePasswordPage />}
    </ProfileLayout>
  );
};

export default SettingProfile;
