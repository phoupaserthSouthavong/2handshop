import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            // If user is signed in, set the user data
            setUser({
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                uid: user.uid,
            });
        }
    }, []);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {

                Swal.fire({
                    title: "ທ່ານຕ້ອງການອອກຈາກລະບົບແທ້ບໍ່",
                    icon: "question",
                    iconHtml: "?",
                    confirmButtonText: "ຕົກລົງ",
                    cancelButtonText: "ຍົກເລີກ",
                    showCancelButton: true,
                    showCloseButton: true

                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        setUser(null); // Clear user state on successful logout
                        navigate('/')
                    } else if (result.isDenied) {
                        setUser({
                            displayName: user.displayName,
                            email: user.email,
                            emailVerified: user.emailVerified,
                            uid: user.uid,
                        });
                    }
                });
                console.log("User signed out");
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    return (
        <div className="main">
            {user ? (
                <div>
                    <h1>Welcome, {user.displayName || "User"}!</h1>
                    <p>Your email: {user.email}</p>
                    <p>Your UID: {user.uid}</p>
                    <p>Email verified: {user.emailVerified ? "Yes" : "No"}</p>
                </div>
            ) : (
                <h1>No user is signed in.</h1>
            )}
            <button onClick={handleLogout} >Logout</button>
            <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-family: 'Jost', sans-serif;
          background: linear-gradient(to bottom, #6666ff, #6666ff, #6666ff);
        }

        .main {
          width: 350px;
          height: 500px;
          background: red;
          overflow: hidden;
          background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/cover;
          border-radius: 10px;
          box-shadow: 5px 20px 50px #000;
        }

        .signup,
        .login {
          position: relative;
          width: 100%;
          height: 100%;
        }

        label {
          color: #fff;
          font-size: 2.3em;
          justify-content: center;
          display: flex;
          margin: 50px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.5s ease-in-out;
        }

        input {
          width: 60%;
          height: 10px;
          background: #e0dede;
          justify-content: center;
          display: flex;
          margin: 20px auto;
          padding: 12px;
          border: none;
          outline: none;
          border-radius: 5px;
        }

        button {
          width: 60%;
          height: 40px;
          margin: 10px auto;
          justify-content: center;
          display: block;
          color: #fff;
          background: #573b8a;
          font-size: 1em;
          font-weight: bold;
          margin-top: 30px;
          outline: none;
          border: none;
          border-radius: 5px;
          transition: 0.2s ease-in;
          cursor: pointer;
        }

        button:hover {
          background: #6d44b8;
        }

        .login {
          height: 460px;
          background: #eee;
          border-radius: 60% / 10%;
          transform: translateY(-180px);
          transition: 0.8s ease-in-out;
        }

        .login label {
          color: #573b8a;
          transform: scale(0.6);
        }

        .translate-up {
          transform: translateY(-500px);
        }

        .shrink label {
          transform: scale(0.6);
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
