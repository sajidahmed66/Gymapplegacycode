import React from "react";

import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";
// import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
// import * as GrIcons from "react-icons/gr";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

import { routesList } from "./routesList";

export const sAdminSlideMenuData = [{
        title: "Dashboard",
        path: routesList.S_ADMIN_HOME,
        icon: < AiIcons.AiFillHome / > ,
        cName: "nav-text",
    },
    {
        title: "Add Trainer",
        path: routesList.S_ADMIN_TRAINER_REGISTRATION,
        icon: < GiIcons.GiMuscleUp / > ,
        cName: "nav-text",
    },
    {
        title: "Add Trainee",
        path: routesList.S_ADMIN_TRAINEE_REGISTRATION,
        icon: < GiIcons.GiMuscleFat / > ,
        cName: "nav-text",
    },
    {
        title: "New Admin",
        path: routesList.S_ADMIN_ADMIN_REGISTRATION,
        icon: < RiIcons.RiAdminLine / > ,
        cName: "nav-text",
    },
    {
        title: "Trainer List",
        path: routesList.S_ADMIN_TRAINER_LIST,
        icon: < GiIcons.GiMuscleUp / > ,
        cName: "nav-text",
    },
    {
        title: "Trainee List",
        path: routesList.S_ADMIN_TRAINEE_LIST,
        icon: < GiIcons.GiMuscleFat / > ,
        cName: "nav-text",
    },
    {
        title: "Profile",
        path: routesList.S_ADMIN_PROFILE,
        icon: < CgIcons.CgProfile / > ,
        cName: "nav-text",
    },
    {
        title: "Update Profile",
        path: routesList.S_ADMIN_UPDATE_PROFILE,
        icon: < ImIcons.ImProfile / > ,
        cName: "nav-text",
    },
    {
        title: "Diet Type List",
        path: routesList.S_ADMIN_GET_DIET_TYPE_LIST,
        icon: < IoIcons.IoMdNutrition / > ,
        cName: "nav-text",
    },
    {
        title: "Exercise Type List",
        path: routesList.S_ADMIN_GET_EXERCISE_TYPE_LIST,
        icon: < CgIcons.CgGym / > ,
        cName: "nav-text",
    },
    {
        title: "Diet Request",
        path: routesList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_LIST,
        icon: < IoIcons.IoMdNutrition / > ,
        cName: "nav-text",
    },
    {
        title: "Exercise Request",
        path: routesList.S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_LIST,
        icon: < CgIcons.CgGym / > ,
        cName: "nav-text",
    },
    {
        title: "Settings",
        path: routesList.S_ADMIN_SETTINGS,
        icon: < IoIcons.IoMdSettings / > ,
        cName: "nav-text",
    },
    {
        title: "Gallery",
        path: routesList.S_ADMIN_GALLERY,
        icon: < RiIcons.RiGalleryLine / > ,
        cName: "nav-text",
    },
    {
        title: "Change Password",
        path: routesList.S_ADMIN_CHANGE_PASSWORD,
        icon: < RiIcons.RiLockPasswordLine / > ,
        cName: "nav-text",
    },
    {
        title: "Package Subscription",
        path: routesList.S_ADMIN_PACKAGE_SUBSCRIPTION,
        icon: < BiIcons.BiPackage / > ,
        cName: "nav-text",
    },
    {
        title: "Trainer Payment",
        path: routesList.S_ADMIN_TRAINER_PAYMENT,
        icon: < MdIcons.MdPayment / > ,
        cName: "nav-text",
    },
    {
        title: "Expense",
        path: routesList.S_ADMIN_EXPENSE,
        icon: < RiIcons.RiMoneyEuroBoxLine / > ,
        cName: "nav-text",
    },
];