import React, { useState, useEffect } from "react";
import QRCode from 'qrcode';
const qrcodeSize = 320

function GenerateQRCode({ string, size, type }) {
    /*
     * https://www.npmjs.com/package/qrcode
     */
  
    const outputtype = ((type === null || type === undefined) ? 'svg' : type);
    const graphicSize = ((size === null || size === undefined) ? qrcodeSize : size);
    // console.debug("GenerateQRCode type", type, "size", size)
    // console.debug(string)
  
    var opts = {
      errorCorrectionLevel: 'H',
      type: outputtype,
      width: graphicSize,
      margin: 1,
      color: {
        dark: '#333333ff',
        light: '#ccccccff'
      }
    };
  
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      async function generateQR() {
  
        setLoading(true);
  
        try {
          await QRCode.toDataURL(string, opts)
            .then(data => {
              setData(data);
              setLoading(false);
            })
            .catch(error => {
              console.error('GenerateQRCode failed.', error);
            });
  
        } catch (err) {
          console.error('GenerateQRCode encountered error:', err);
        }
  
        return undefined;
      }
  
      generateQR();
    }, []);
  
    return (
      <>
        {(isLoading || data === null) ? (
          <p>Loading ...</p>
        ) : (
            <img src={data} alt="QRcode to scan same as config below" />
          )}
      </>
    );
  }

export {GenerateQRCode} ;


