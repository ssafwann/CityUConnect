import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ForumPage from "../../pages/Forum/ForumPage";
import ForumCategoryPosts from "../../pages/Forum/ForumCategoryPosts";
import ForumCreatePost from "../../pages/Forum/ForumCreatePost";
import ForumPost from "../../pages/Forum/ForumPost";
import OthersProfilePage from "../../pages/Forum/OthersProfilePage";

const ForumStack = createStackNavigator();

const ForumStackNavigator = () => {
  return (
    <ForumStack.Navigator screenOptions={{ headerShown: false }}>
      <ForumStack.Screen name="ForumPage" component={ForumPage} />
      <ForumStack.Screen
        name="ForumCategoryPosts"
        component={ForumCategoryPosts}
      />
      <ForumStack.Screen name="ForumCreatePost" component={ForumCreatePost} />
      <ForumStack.Screen name="ForumPost" component={ForumPost} />
      <ForumStack.Screen name="PeoplesProfile" component={OthersProfilePage} />
    </ForumStack.Navigator>
  );
};

export default ForumStackNavigator;
