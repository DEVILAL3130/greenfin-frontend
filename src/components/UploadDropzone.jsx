// // // // // import { useState } from "react";
// // // // // import { motion } from "framer-motion";
// // // // // import api from "../services/api";

// // // // // export default function UploadDropzone({ onUploadSuccess }) {
// // // // //   const [uploading, setUploading] = useState(false);
// // // // //   const [progress, setProgress] = useState(0);

// // // // //   const handleFile = async (file) => {
// // // // //     setUploading(true);
// // // // //     setProgress(0);

// // // // //     const formData = new FormData();
// // // // //     formData.append("file", file);
// // // // //     formData.append("documentType", "ID_PROOF");

// // // // //     await api.post("/documents/upload", formData, {
// // // // //       onUploadProgress: (e) => {
// // // // //         setProgress(Math.round((e.loaded * 100) / e.total));
// // // // //       },
// // // // //     });

// // // // //     setUploading(false);
// // // // //     setProgress(100);

// // // // //     onUploadSuccess({
// // // // //       name: file.name,
// // // // //       status: "Uploaded",
// // // // //     });
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       className="border-2 border-dashed p-10 rounded-lg text-center"
// // // // //       onDragOver={(e) => e.preventDefault()}
// // // // //       onDrop={(e) => {
// // // // //         e.preventDefault();
// // // // //         handleFile(e.dataTransfer.files[0]);
// // // // //       }}
// // // // //     >
// // // // //       <input
// // // // //         type="file"
// // // // //         hidden
// // // // //         id="fileInput"
// // // // //         onChange={(e) => handleFile(e.target.files[0])}
// // // // //       />

// // // // //       <label htmlFor="fileInput" className="cursor-pointer">
// // // // //         <p className="text-gray-600">
// // // // //           Drag & drop or click to upload document
// // // // //         </p>
// // // // //       </label>

// // // // //       {uploading && (
// // // // //         <motion.div
// // // // //           className="mt-4 h-2 bg-gray-200 rounded"
// // // // //           initial={{ width: 0 }}
// // // // //           animate={{ width: `${progress}%` }}
// // // // //         >
// // // // //           <div className="h-2 bg-green-600 rounded" />
// // // // //         </motion.div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // import { useState } from "react";
// // // // import { motion } from "framer-motion";
// // // // import api from "../services/api";

// // // // export default function UploadDropzone({ onUploadSuccess }) {
// // // //   const [uploading, setUploading] = useState(false);
// // // //   const [progress, setProgress] = useState(0);

// // // //   const handleFile = async (file) => {
// // // //     if (!file) return;

// // // //     try {
// // // //       setUploading(true);
// // // //       setProgress(0);

// // // //       const formData = new FormData();

// // // //       // ✅ MUST MATCH backend: upload.single("document")
// // // //       formData.append("document", file);
// // // //       formData.append("documentType", "ID_PROOF");

// // // //       const res = await api.post("/documents/upload", formData, {
// // // //         headers: {
// // // //           "Content-Type": "multipart/form-data",
// // // //         },
// // // //         onUploadProgress: (e) => {
// // // //           if (!e.total) return;
// // // //           setProgress(Math.round((e.loaded * 100) / e.total));
// // // //         },
// // // //       });

// // // //       // ✅ Use backend response
// // // //       onUploadSuccess({
// // // //         url: res.data.documentUrl || res.data.document?.url,
// // // //         name: file.name,
// // // //         status: "UPLOADED",
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Upload failed:", error);
// // // //       alert("Document upload failed. Please try again.");
// // // //     } finally {
// // // //       setUploading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className="border-2 border-dashed p-10 rounded-lg text-center"
// // // //       onDragOver={(e) => e.preventDefault()}
// // // //       onDrop={(e) => {
// // // //         e.preventDefault();
// // // //         handleFile(e.dataTransfer.files[0]);
// // // //       }}
// // // //     >
// // // //       <input
// // // //         type="file"
// // // //         hidden
// // // //         id="fileInput"
// // // //         onChange={(e) => handleFile(e.target.files[0])}
// // // //       />

// // // //       <label htmlFor="fileInput" className="cursor-pointer">
// // // //         <p className="text-gray-600">
// // // //           Drag & drop or click to upload document
// // // //         </p>
// // // //       </label>

// // // //       {uploading && (
// // // //         <div className="mt-4 h-2 bg-gray-200 rounded overflow-hidden">
// // // //           <motion.div
// // // //             className="h-2 bg-green-600"
// // // //             initial={{ width: 0 }}
// // // //             animate={{ width: `${progress}%` }}
// // // //             transition={{ ease: "easeOut" }}
// // // //           />
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import api from "../services/api";

// // export default function UploadDropzone({ onUploadSuccess }) {
// //   const [uploading, setUploading] = useState(false);
// //   const [progress, setProgress] = useState(0);

// //   // const handleFile = async (file) => {
// //   //   if (!file) return;

// //   //   try {
// //   //     setUploading(true);
// //   //     setProgress(0);

// //   //     const formData = new FormData();

// //   //     // MUST MATCH: upload.single("document")
// //   //     formData.append("document", file);
// //   //     formData.append("documentType", "ID_PROOF");

// //   //     const res = await api.post("/documents/upload", formData, {
// //   //       headers: { "Content-Type": "multipart/form-data" },
// //   //       onUploadProgress: (e) => {
// //   //         if (e.total) {
// //   //           setProgress(Math.round((e.loaded * 100) / e.total));
// //   //         }
// //   //       },
// //   //     });

// //   //     console.log("UPLOAD RESPONSE 👉", res.data);

// //   //     // ✅ PASS EXACT BACKEND OBJECT
// //   //     onUploadSuccess(res.data.document);
// //   //   } catch (error) {
// //   //     console.error("Upload failed:", error);
// //   //     alert("Document upload failed. Please try again.");
// //   //   } finally {
// //   //     setUploading(false);
// //   //   }
// //   // };
// // const handleFile = async (file) => {
// //   if (!file) return;

// //   try {
// //     setUploading(true);
// //     setProgress(0);

// //     const formData = new FormData();
// //     formData.append("document", file); // MUST MATCH upload.single("document")
// //     formData.append("documentType", "ID_PROOF");

// //     const res = await api.post("/documents/upload", formData, {
// //       onUploadProgress: (e) => {
// //         if (e.total) {
// //           setProgress(Math.round((e.loaded * 100) / e.total));
// //         }
// //       },
// //     });

// //     console.log("UPLOAD RESPONSE 👉", res.data);

// //     // ✅ PUSH DB-SAVED DOCUMENT TO UI
// //     onUploadSuccess(res.data.document);
// //   } catch (error) {
// //     console.error("Upload failed:", error);
// //     alert("Document upload failed");
// //   } finally {
// //     setUploading(false);
// //   }
// // };

// //   return (
// //     <div
// //       className="border-2 border-dashed p-10 rounded-lg text-center"
// //       onDragOver={(e) => e.preventDefault()}
// //       onDrop={(e) => {
// //         e.preventDefault();
// //         handleFile(e.dataTransfer.files[0]);
// //       }}
// //     >
// //       <input
// //         type="file"
// //         hidden
// //         id="fileInput"
// //         onChange={(e) => handleFile(e.target.files[0])}
// //       />

// //       <label htmlFor="fileInput" className="cursor-pointer">
// //         <p className="text-gray-600">
// //           Drag & drop or click to upload document
// //         </p>
// //       </label>

// //       {uploading && (
// //         <div className="mt-4 h-2 bg-gray-200 rounded overflow-hidden">
// //           <motion.div
// //             className="h-2 bg-green-600"
// //             initial={{ width: 0 }}
// //             animate={{ width: `${progress}%` }}
// //             transition={{ ease: "easeOut" }}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { motion } from "framer-motion";
// import api from "../services/api";

// export default function UploadDropzone({ onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleFile = async (file) => {
//     if (!file) return;

//     try {
//       setUploading(true);
//       setProgress(0);

//       const formData = new FormData();
//       formData.append("document", file); // MUST MATCH backend
//       formData.append("documentType", "ID_PROOF");
//       formData.append("loanId", selectedLoanId);
//       formData.append("file", file);


//       const res = await api.post("/documents/upload", formData, {
//         onUploadProgress: (e) => {
//           if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
//         },
//       });

//       console.log("UPLOAD RESPONSE 👉", res.data);
//       onUploadSuccess(res.data.document);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Document upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div
//       className="border-2 border-dashed p-10 rounded-lg text-center"
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={(e) => {
//         e.preventDefault();
//         handleFile(e.dataTransfer.files[0]);
//       }}
//     >
//       <input
//         type="file"
//         hidden
//         id="fileInput"
//         onChange={(e) => handleFile(e.target.files[0])}
//       />

//       <label htmlFor="fileInput" className="cursor-pointer">
//         <p className="text-gray-600">Drag & drop or click to upload document</p>
//       </label>

//       {uploading && (
//         <div className="mt-4 h-2 bg-gray-200 rounded overflow-hidden">
//           <motion.div
//             className="h-2 bg-green-600"
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             transition={{ ease: "easeOut" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";
// import { motion } from "framer-motion";
// import api from "../services/api";

// export default function UploadDropzone({ loanId, onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleFile = async (file) => {
//     if (!file) return;

//     if (!loanId) {
//       alert("Loan ID missing. Please apply loan first.");
//       return;
//     }

//     try {
//       setUploading(true);
//       setProgress(0);

//       const formData = new FormData();
//       formData.append("file", file);        // ✅ matches multer
//       formData.append("loanId", loanId);    // ✅ required
//       formData.append("name", file.name);   // ✅ document name

//       const res = await api.post("/documents/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (e) => {
//           if (e.total) {
//             setProgress(Math.round((e.loaded * 100) / e.total));
//           }
//         },
//       });

//       console.log("UPLOAD RESPONSE 👉", res.data);

//       if (onUploadSuccess) {
//         onUploadSuccess(res.data.document);
//       }

//       alert("Document uploaded successfully ✅");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Document upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div
//       className="border-2 border-dashed p-10 rounded-lg text-center"
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={(e) => {
//         e.preventDefault();
//         handleFile(e.dataTransfer.files[0]);
//       }}
//     >
//       <input
//         type="file"
//         hidden
//         id="fileInput"
//         onChange={(e) => handleFile(e.target.files[0])}
//       />

//       <label htmlFor="fileInput" className="cursor-pointer">
//         <p className="text-gray-600">
//           Drag & drop or click to upload document
//         </p>
//       </label>

//       {uploading && (
//         <div className="mt-4 h-2 bg-gray-200 rounded overflow-hidden">
//           <motion.div
//             className="h-2 bg-green-600"
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             transition={{ ease: "easeOut" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function UploadDropzone({ loanId, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = async (file) => {
    if (!file) return;

    if (!loanId) {
      alert("Loan ID missing. Please apply loan first.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);     // MUST match multer field
      formData.append("loanId", loanId);

      const res = await api.post("/documents/upload", formData, {
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      console.log("UPLOAD RESPONSE 👉", res.data);

      onUploadSuccess?.(res.data.document);
      alert("Document uploaded successfully ✅");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error);
      alert("Document upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="border-2 border-dashed p-10 rounded-lg text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        type="file"
        hidden
        id="fileInput"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <label htmlFor="fileInput" className="cursor-pointer">
        <p className="text-gray-600">Drag & drop or click to upload document</p>
      </label>

      {uploading && (
        <div className="mt-4 h-2 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="h-2 bg-green-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
