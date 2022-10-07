/* eslint-disable no-lone-blocks */
import React from "react";

import * as AiIcons from "react-icons/ai";
// import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";
// import * as FaIcons from "react-icons/fa";
// import * as GiIcons from "react-icons/gi";
// import * as GrIcons from "react-icons/gr";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
// import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

import { routesList } from "./routesList";

export const trainerSlideMenuData = [{
        title: "Home",
        path: routesList.TRAINER_HOME,
        icon: < AiIcons.AiFillHome / > ,
        cName: "nav-text",
    },
    {
        title: "Profile",
        path: routesList.TRAINER_PROFILE,
        icon: < CgIcons.CgProfile / > ,
        cName: "nav-text",
    },
    {
        title: "Update Profile",
        path: routesList.TRAINER_UPDATE_PROFILE,
        icon: < ImIcons.ImProfile / > ,
        cName: "nav-text",
    },
    {
        title: "Diet Type List",
        path: routesList.TRAINER_GET_DIET_TYPE_LIST,
        icon: < IoIcons.IoMdNutrition / > ,
        cName: "nav-text",
    },
    {
        title: "Exercise Type List",
        path: routesList.TRAINER_GET_EXERCISE_TYPE_LIST,
        icon: < CgIcons.CgGym / > ,
        cName: "nav-text",
    },
    {
        title: "Diet Request",
        path: routesList.TRAINER_TRAINEE_DIET_REQUEST_LIST,
        icon: < IoIcons.IoMdNutrition / > ,
        cName: "nav-text",
    },
    {
        title: "Exercise Request",
        path: routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_LIST,
        icon: < CgIcons.CgGym / > ,
        cName: "nav-text",
    },
    {
        title: "Change Password",
        path: routesList.TRAINER_CHANGE_PASSWORD,
        icon: < RiIcons.RiLockPasswordLine / > ,
        cName: "nav-text",
    },
];