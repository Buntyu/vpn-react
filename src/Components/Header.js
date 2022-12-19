import React, { useState } from "react";
import style from '/Users/gagandeepuniyal/Desktop/react/vpn-mock/src/style.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function(){


    const [openMenu, setOpenMenu]= useState(false);
    const toggleMenu =() =>{
        setOpenMenu(!openMenu);
    };
    return(
        
    


        <div className="head">
            <div>
                <ul className="horizontal-list head">
                    <li className="horizontal-list"><Button variant="contained" className="rounded">LOG OUT</Button></li>
                    <li className="horizontal-list"><MenuIcon  fontSize="large" onClick={toggleMenu}/>

                        {openMenu ? (
                        <div className="toggle-nav">
                            <ul className="horizontal-list">
                          <li className="horizontal-list"> <CloseOutlinedIcon onClick={toggleMenu} fontSize="large" className="close"/>
                            <ul className="horizontal-list"> 
            <li className="mt-8"><a className="horizontal-list"  href="#"><AccountCircleOutlinedIcon className="icons"/> ACCOUNT</a></li>
           <li className="mt-8"><a className="horizontal-list" href="#"> <PaymentOutlinedIcon  className="icons"/> PAYMENT</a></li>
           <li  className="mt-8"><a className="horizontal-list" href="#"><DevicesOutlinedIcon  className="icons"/> DEVICES</a></li>
           <li className="mt-8"><a className="horizontal-list"  href="#"><VpnKeyOutlinedIcon  className="icons"/>ACCESS KEYS</a></li>
           <li  className="mt-8"><Button variant="contained" className="rounded-toggle"><LogoutOutlinedIcon/> LOG OUT</Button></li>
           </ul>
           </li>
           </ul>
                        </div>
                     ):null }

                    
                    
                    
                    </li>
                    

                </ul>

            </div>
            

            


        </div>
    )
}