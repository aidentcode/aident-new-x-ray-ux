//import header from "../../public/header.svg";

export const getPrintReportHtml = (origin: string) => {
    const header = `${origin}/header.svg`;
    return `
<html>            
<head>
   <title>Ai Dent™ X- ray analysis</title>
   <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
   <meta http-equiv="X-UA-Compatible" content="IE=edge" />

   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet" />
   <!--[if mso]>
      <style>body,table,td { font-family:  arial, sans-serif !important; }</style>
      <![endif]-->
   <style type="text/css">
      body {
         margin: 0 !important;
         padding: 20px !important;
         -webkit-text-size-adjust: 100% !important;
         -ms-text-size-adjust: 100% !important;
         -webkit-font-smoothing: antialiased !important;
         font-family: 'Roboto', Arial, sans-serif;
      }

      img {
         border: 0 !important;
         outline: none !important;
      }

      p {
         Margin: 0px !important;
         Padding: 0px !important;
      }

      table {
         border-collapse: collapse;
         mso-table-lspace: 0px;
         mso-table-rspace: 0px;
      }

      td,
      a,
      span {
         border-collapse: collapse;
         mso-line-height-rule: exactly;
      }

      .ExternalClass * {
         line-height: 100%;
      }

      .defaultlink a {
         color: inherit !important;
         text-decoration: none !important;
      }

      @media only screen and (min-width:480px) and (max-width:1280px) {
         .inx_wrapper {
            width: 100% !important;
         }

         .inx_img {
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
         }

      }

      @media screen and (max-width: 479px) {
         .inx_wrapper {
            width: 100% !important;
         }

         .inx_img {
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
         }
      }

      @media print {

         .print-button{
            display: none
         }
          .footer {
            display: fixed; /* Show footer on print */
            bottom: 0;
         }
}
   </style>
</head>

<body id="reportBody" style="margin: 0px; padding: 20px !important; background: #ffffff;">


   <table width="100%" class="content" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="background-color:#ffffff;">

      <tr>
         <td align="center" valign="top" style="padding: 10px 0px 20px;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="inx_wrapper"
               style="width:100%;" bgcolor="#feffff">

               <tr>
                 <td style="padding-bottom:30px !important;">
                    <img src="${header}" alt="header" width="100%" style="width:100%;">
                 <td/>
               <tr/>
               <tr>
                  <td align="left"
                     style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 16px;line-height: 24px;font-weight: 400;padding-bottom: 10px;text-align: left;">
                     Analyzed X ray image</td>
               </tr>`;
};

export const print2 = (data: { email_id: string }) => {
    return `
               <tr>
                  <td valign="top" style="padding-bottom: 0px;">
                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                           <td align="left"
                              style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 16px;line-height: 24px;font-weight: 500;padding-bottom: 20px;text-align: left;">
                              Dentist’s Ai Dent ™ email ID: ${data?.email_id}</td>
                        </tr>

                        <tr > 
                           <td align="left" style=" color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 16px;line-height: 24px;font-weight: 500;padding-bottom: 15px;text-align: left;"> Region of Interest:</td>
                           <td align="left" style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 16px;line-height: 24px;font-weight: 500;padding-bottom: 15px;text-align: left;">
                              Date of X-Ray:
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>`;
};

export const print3 = `
            </table>
         </td>
      </tr>
   </table>
   <table width="100%" border="1" cellspacing="0" cellpadding="0" style="background: #ffffff;" bgcolor="#ffffff">
      <thead>
         <tr>
            <th align="left"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 10px 10px;font-weight: 500;font-size: 14px;white-space: nowrap;"
               width="100">Findings</th>
            <th align="left"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 10px 10px;font-weight: 500;font-size: 14px;white-space: nowrap;"
               width="250">
               Interpretation</th>
            <th align="left" width="150"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 10px 10px;font-weight: 500;font-size: 14px;white-space: nowrap;">
               Treatment recommendation</th>
                <th align="left"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 10px 10px;font-weight: 500;font-size: 14px;white-space: nowrap;"
               width="250">
               Additional information</th>
            <th align="left" width="150"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 10px 10px;font-weight: 500;font-size: 14px;white-space: nowrap;">
               Video link
            </th>
         </tr>
      </thead>
      <tbody>
         `;

export const print4 = `
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 8px 10px;font-size: 14px;font-weight: 400;">
               <p style="font-weight: 600;font-size: 14px;color: #333333;padding-bottom: 15px !important;">
                  Furcation</p>
               <p
                  style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;display: -webkit-box;">
                  Area: <span style="border-bottom: 1px solid #000000;display: block;width: 40px;"></span>
                  mm<sup style="font-size: 10px;">2</sup></p>
               <p
                  style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                  Grade:</p>
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               Findings indicate moderate to
               severe gap between the roots of...
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               Bone loss that is specific to
               branching of a tooth's roots is
               known as a furcation defect.
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
            </td>
         </tr>

         <tr>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 8px 10px;font-size: 14px;font-weight: 400;">
               <p style="font-weight: 600;font-size: 14px;color: #333333;padding-bottom: 15px !important;">
                  Bone Loss</p>
               <p
                  style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;display: -webkit-box;">
                  Area: <span style="border-bottom: 1px solid #000000;display: block;width: 40px;"></span>
                  mm<sup style="font-size: 10px;">2</sup></p>

               <p
                  style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;display: -webkit-box;">
                  Length: <span style="border-bottom: 1px solid #000000;display: block;width: 40px;"></span>
                  mm<sup style="font-size: 10px;">2</sup></p>
               <p
                  style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                  Stage:</p>
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               At this stage, there's severe
               damage to the bone supporting
               the teeth, which can cause teeth
               to become loose and fall out.
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               It happens when the gums and
               bone surrounding the teeth starts
               to shrink. Tooth mobility,
               receding gums,mouth sores,
               swollen or bleeding gums are
               the conditions observed with
               bone loss.
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
            </td>
         </tr>

         <tr>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 8px 10px;font-size: 14px;font-weight: 400;">
               <p style="font-weight: 600;font-size: 14px;color: #333333;padding-bottom: 15px !important;">
                  Calculus</p>
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               Indicates poor oral hygiene
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               When plaque collects on teeth it
               hardens into calculus,on your
               teeth which can lead to serious
               gum disease, bad breath and
               bleeding gums.
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
            </td>
         </tr>
      </tbody>
   </table>
   `;

export const print5 = () => {
    return `
   <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff;" bgcolor="#ffffff">

      <tr>
         <td align="left" valign="top" style="padding-top: 30px;">
            <table width="100%" align="left" border="0" cellspacing="0" cellpadding="0">

               <tr>
                  <td valign="top" style="padding-bottom: 0px;">
                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                           <tr>
                              <td align="left"
                                 style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 16px;line-height: 24px;font-weight: 500;padding-bottom: 50px;text-align: left;">
                                 Comments:</td>
                           </tr>
                           <tr>
                              <td align="left" id="dentist"
                                 style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 16px;line-height: 24px;font-weight: 500;padding-bottom: 15px;text-align: left;">
                                 Attending Dentist: </td>
                           </tr>
                           <tr>
                              <td align="left"
                                 style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 16px;line-height: 24px;font-weight: 500;padding-bottom: 15px;text-align: left;">
                                 Signature:</td>
                           </tr>
                        </tbody>
                     </table>
                  </td>
               </tr>


               <tr>
                  <td valign="top" style="padding-bottom: 0px;padding-top: 30px;">
                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                           <tr>
                              <td align="left"
                                 style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 20px;line-height: 28px;font-weight: 500;padding-bottom: 5px;text-align: left;font-style: italic;">
                                 Disclaimer:</td>
                           </tr>

                           <tr>
                              <td align="left"
                                 style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 14px;line-height: 24px;font-weight: 400;padding-bottom: 15px;text-align: left;font-style: italic;">
                                 This report is generated by AI software and serves as a guide for dental professionals
                                 in interpreting
                                 radiographic findings of dental caries using the ICCMS staging system. It should be
                                 used in
                                 conjunction with clinical examination and patient history for accurate diagnosis and
                                 treatment
                                 planning</td>
                           </tr>

                           <tr>
                              <td align="left"
                                 style="color: #333333;font-family: 'Roboto', Arial, sans-serif;font-size: 14px;line-height: 24px;font-weight: 400;padding-bottom: 15px;text-align: left;font-style: italic;">
                                 Clinical correlation is essential.</td>
                           </tr>


                        </tbody>
                     </table>
                  </td>
               </tr>
            </table>
         </td>
      </tr>

   </table>

</body>

          </html>
        `;
};
