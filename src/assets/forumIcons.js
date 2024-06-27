import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const icons = {
  Index: (props) => <AntDesign name="home" size={24} {...props} />,
  Forum: (props) => (
    <MaterialCommunityIcons
      name="forum-outline"
      size={24}
      color="black"
      {...props}
    />
  ),
  Profile: (props) => <AntDesign name="user" size={24} {...props} />,
  SignOut: (props) => <Octicons name="sign-out" size={24} {...props} />,
};
