import React, { useState, useEffect } from 'react';
import { getAuth, setPersistence, browserLocalPersistence, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Shop = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // UseEffect to set session persistence and fetch the logged-in user
    useEffect(() => {
        const auth = getAuth();
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

    // Handle Logout with confirmation dialog
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

    // Product data
    const products = [
        {
            id: 0,
            passID: "cf-01",
            imageSrc: "img/n6.jpg",
            name: "suit",
            description: "ອິທັປປັຈຈະຍະຕາ ແລະ ປະຕິຈະສະມຸປບາທ ແປລາວ ປັນຈະເວຣະພະຍະສູຕຣ. 13/57/41.",
            price: 50000,
        },
        {
            id: 1,
            passID: "cf-02",
            imageSrc: "https://img.ws.mms.shopee.co.th/c378132074457d6cfaf6d0d0d1d54a1d",
            name: "ເສື້ອແຂນຍາວ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 75000,
        },
        {
            id: 2,
            passID: "cf-03",
            imageSrc: "https://funkymonkeyshoes.gr/wp-content/uploads/2022/09/Compress_20220906_135017_7246.jpg",
            name: "ເກີບຜ້າໃບ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 85000,
        },
    ];

    // State for the cart and cart visibility
    const [cart, setCart] = useState([]);
    const [isCartOpen, setCartOpen] = useState(false);

    // Add products to cart
    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    // Format prices to include commas
    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    };

    // Send the order via WhatsApp
    const sendOrder = () => {
        if (cart.length === 0) return alert("ກະຕ່າເຈົ້າວ່າງເປົ່າ");

        const orderDetails = cart.map(item => `ລະຫັດ: ${item.passID} - ${item.name} - ${formatPrice(item.price)} ກີບ`).join('%0A');
        const total = cart.reduce((total, item) => total + item.price, 0);
        const message = `ອໍເດີ້ ຈາກ ${user.email} :%0A${orderDetails}%0ATotal: ${formatPrice(total)} ກີບ.%0A`;
        const whatsappUrl = `https://wa.me/8562059262982?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    // Toggle cart menu visibility
    const toggleCart = () => {
        setCartOpen(!isCartOpen);
    };

    return (
        <div>
            <header>
                <section className="product">
                    <div>
                        <h1>ເສື້ອຜ້າມືສອງ</h1>
                        {user ? (
                            <div>
                                <p>ຜູ້ໃຊ້: {user.email}</p>
                            </div>
                        ) : (
                            <h1>No user is signed in.</h1>
                        )}
                        <button onClick={handleLogout} className='cart-button'>ອອກຈາກລະບົບ</button>

                    </div>

                    <div className='Cart-btn'>
                        <button onClick={toggleCart} className="cart-button">
                            🛒 {cart.length} ສິນຄ້າ
                        </button>
                    </div>


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

            <footer>© ທີມອະນຸລັກສັດປ່າ (ນ້ອງແມວ) 2024</footer>

            <style jsx>{`
                /* General Reset */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth; /* Smooth scrolling */
}

body {
    font-family: 'Phetsarath OT', 'Times New Roman', Times, serif;
    background-color: #f4f4f4;
    color: #333; /* Default text color */
    line-height: 1.6; /* Better readability */
}

/* List Styles */
li {
    list-style-type: none;
}

/* Header Styles */
header {
    background-color: #212F3D;
    color: white;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Product Section */
.product {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 100%;
    margin-bottom: 20px; /* Add some space below */
}

/* Button Styles */
.cart-button {
    background: linear-gradient(135deg, #3498DB, #2980B9);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cart-button:hover {
    background: linear-gradient(135deg, #2980B9, #3498DB);
    transform: scale(1.05);
}

/* Cart Menu */
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
    z-index: 1000; /* Ensure it appears above other content */
}

/* Section Styles */
section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 30px;
}

/* Phone Card Styles */
.phone-card {
    width: 250px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 20px;
    transition: transform 0.2s;
}

.phone-card:hover {
    transform: translateY(-5px); /* Lift effect on hover */
}

.phone-card img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

.phone-card h2 {
    font-size: 20px;
    margin: 10px 0;
}

.phone-card p {
    font-size: 14px;
    color: #555;
}

.phone-card button {
    background-color: #2ECC71;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.phone-card button:hover {
    background-color: #27AE60; /* Darker green on hover */
}

/* Footer Styles */
footer {
    text-align: center;
    padding: 20px;
    background-color: #212F3D;
    color: white;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .product {
        flex-direction: column;
        align-items: center;
    }

    .phone-card {
        width: 90%; /* Take up more space on smaller screens */
        margin: 10px 0; /* Reduce margin */
    }

    header, footer {
        padding: 15px; /* Adjust padding */
    }

    .cart-button {
        width: 100%; /* Full-width buttons */
    }
}

@media (max-width: 480px) {
    .phone-card h2 {
        font-size: 18px; /* Smaller heading */
    }

    .phone-card p {
        font-size: 12px; /* Smaller text */
    }

    .cart-button {
        padding: 10px; /* Adjust button padding */
    }
}

/* Additional Utility Classes */
.text-center {
    text-align: center;
}

.mt-20 {
    margin-top: 20px;
}

.mb-20 {
    margin-bottom: 20px;
}

.p-20 {
    padding: 20px;
}

.rounded {
    border-radius: 8px;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 0.5s ease-in;
}


            `}</style>
        </div>
    );
};

export default Shop;
