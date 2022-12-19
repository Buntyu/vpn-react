import React from "react";
import style from '/Users/gagandeepuniyal/Desktop/react/vpn-mock/src/style.css';
import { Button } from "@mui/material";

export default function(){
    return (
        <div>
          <div className="footer">
            <div className="footer-wrp">

          <ul className="horizontal-list-ft">
            <li className="horizontal-list-ft">
                <img src='./images/logo1.png' alt="logo " className="footer-logo"/>
    
            </li>
            <li className="horizontal-list-ft pl-5" >
                <ul className="horizontal-list-ft">
                    <li><h6 className="foot-h6">About</h6></li>			
                <li><a href="#" className="horizontal-list-ft ftr-text" >Who We Are</a></li>
                <li><a href="#" className="horizontal-list-ft ftr-text" >Policies</a></li>
                <br />
                </ul>
                </li>          
        
            <li className="horizontal-list-ft pl-5">
            <ul className="horizontal-list-ft">
                    <li><h6 className="foot-h6">Privacy</h6></li>			
                <li><a href="#" className="horizontal-list-ft ftr-text" >Inormation</a></li>
                <li><a href="#" className="horizontal-list-ft ftr-text" >System Security</a></li>
                <li><a href="#" className="horizontal-list-ft ftr-text" >Your Security</a></li>
            </ul>	
            </li>
            <li className="horizontal-list-ft pl-5">
                <ul className="horizontal-list-ft">
                    <li><h6 className="foot-h6">Support</h6></li>			
                <li><a href="#" className="horizontal-list-ft ftr-text" >Documentation</a></li>
                <li><a href="#" className="horizontal-list-ft ftr-text" >Contact Us</a></li>
                <br />
                <li></li>
                </ul>
                </li> 
                <li className="horizontal-list-ft pl-5">
                <ul className="horizontal-list-ft">
                    <li><h6 className="foot-h6">Blog</h6></li>		
                    <br />
                    <br/>
                    <br />	
                </ul>
                </li> 
                
            <li className="horizontal-list-ft-btn pl-8" >
              <span className="text3">For your <b>privacy</b></span>
              <li className="horizontal-list-ft-btn"><Button variant="contained" className="footer-btn">Get Started</Button></li>
              <br />
              <br />
              <br />

            </li>
            </ul>
          </div>
          </div>
    
          <div>
            <p className="copyrt">Copyright info</p>
          </div>
        </div>
      );
    }
    