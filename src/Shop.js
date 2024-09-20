import React, { useState, useEffect } from 'react';
import { getAuth, setPersistence, browserLocalPersistence, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Shop = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const auth = getAuth();
        // Set session persistence to local (keeps user signed in across reloads)
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    setUser({
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        emailVerified: currentUser.emailVerified,
                        uid: currentUser.uid,
                    });
                }
            })
            .catch((error) => {
                console.error("Failed to set persistence:", error);
            });
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "ທ່ານຕ້ອງການອອກຈາກລະບົບແທ້ບໍ່?",
            icon: "question",
            iconHtml: "?",
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: "ຍົກເລີກ",
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                const auth = getAuth();
                signOut(auth)
                    .then(() => {
                        setUser(null); // Clear user state on successful logout
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error("Error signing out: ", error);
                    });
                console.log("User signed out");
            }
        });
    };

    const products = [
        // Your product data
    ];

    const [cart, setCart] = useState([]);
    const [isCartOpen, setCartOpen] = useState(false);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    };

    const sendOrder = () => {
        if (cart.length === 0) return alert("ກະຕ່າເຈົ້າວ່າງເປົ່າ");

        const orderDetails = cart.map(item => `${item.name} - ${formatPrice(item.price)} ກີບ`).join('%0A');
        const total = cart.reduce((total, item) => total + item.price, 0);
        const message = `Order Details:%0A${orderDetails}%0ATotal: ${formatPrice(total)} ກີບ`;
        const whatsappUrl = `https://wa.me/8562059262982?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const toggleCart = () => {
        setCartOpen(!isCartOpen);
    };

    return (
        <div>
            <header>
                <section className="product">
                    <div className="box1">
                        <h3>ເສື້ອຜ້າມືສອງ</h3>
                        {user ? (
                            <div>
                                <p>Your email: {user.email}</p>
                                <p>Email verified: {user.emailVerified ? "Yes" : "No"}</p>
                            </div>
                        ) : (
                            <h1>No user is signed in.</h1>
                        )}
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <button onClick={toggleCart} className="cart-button">
                        🛒 {cart.length} ສິນຄ້າ
                    </button>
                </section>
            </header>

            {isCartOpen && (
                <div className="cart-menu">
                    <h2>ກະຕ່າ</h2>
                    {cart.length === 0 ? (
                        <p>ກະຕ່າເຈົ້າວ່າງເປົ່າ.</p>
                    ) : (
                        <div>
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index}>
                                        {index + 1}. {item.name} - {formatPrice(item.price)} ກີບ
                                    </li>
                                ))}
                            </ul>
                            <h3>ລວມ: {formatPrice(cart.reduce((total, item) => total + item.price, 0))} ກີບ</h3>
                            <button onClick={sendOrder}>ສັ່ງຊື້ສິນຄ້າໃນກະຕ່າ</button>
                        </div>
                    )}
                </div>
            )}

            <section>
                {products.map((product) => (
                    <div className="phone-card" key={product.id}>
                        <img src={product.imageSrc} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>ລາຄາ: {formatPrice(product.price)} ກີບ</p>
                        <p>{product.description}</p>
                        <button onClick={() => addToCart(product)}>ຈັບໃສ່ກະຕ່າ</button>
                    </div>
                ))}
            </section>

            <footer>© New fashion 2024</footer>
            <style jsx>{`
                li {
                    list-style-type: none;
                }

                body {
                    font-family: 'Phetsarath OT', 'Times New Roman', Times, serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .product {
                    background-color: #EAEDED;
                    display: flex;
                    justify-content: space-between;
                    padding: 20px;
                    width: 100%;
                }

                header {
                    color: #212F3D;
                    padding: 10px;
                    text-align: center;
                }

                .box1 {
                    margin-top: 10px;
                    font-size: 27px;
                    font-family: Lao_Manikhot2;
                    color: brown;
                }

                .cart-button {
                    background-color: #3498DB;
                    color: white;
                    border: none;
                    padding: 10px 10px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                }

                .cart-menu {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                section {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    padding: 15px;
                }

                .phone-card {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin: 10px;
                    padding: 20px;
                    width: 300px;
                }

                .phone-card img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 20px;
                }

                footer {
                    background-color: #2E86C1;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    width: 100%;
                }

                button {
                    background-color: #3498DB;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                }

                button:hover {
                    background-color: #2980B9;
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default Shop;
