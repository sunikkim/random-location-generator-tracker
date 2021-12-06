// import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// import { auth, sendPasswordResetEmail } from "firebase";

// const Reset = () => {
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     if (loading) return;

//     return (
//       <div className="reset">
//         <div className="reset__container">
//           <input
//             type="text"
//             className="reset__textBox"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="E-mail Address"
//           />
//           <button
//             className="reset__btn"
//             onClick={() => sendPasswordResetEmail(email)}
//           >
//             Send password reset email
//           </button>
//           {/* <div>
//             Don't have an account? <Link to="/register">Register</Link> now.
//           </div> */}
//         </div>
//       </div>
//     );
//  });
// }

// export default Reset;