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
            imageSrc: "https://sg-test-11.slatic.net/p/2b721d8aaaa94486a2ef5d9ec5c85fa9.jpg_170x170q80.jpg_.webp",
            name: "Vaseline Pro Derma Niacinamide Brightening Body Lotion 250 Ml.",
            description: "Vaseline Pro Derma Niacinamide Brightening Body Lotion 1. Repair Combine prebiotics repairing essence with Vaseline Wonder Jelly, to help promote microbiome balance on skin. 2. Enhance Infused with pure Niacinamide, and further boosted with Hexylresorcinol and Resveratrol, to brighten stubborn dull and damaged skin for an even skin tone.",
            price: 240924,
        },
        {
            id: 1,
            passID: "cf-02",
            imageSrc: "https://th-test-11.slatic.net/p/047dc5090b12d5d645a890bba015567c.jpg_170x170q80.jpg_.webp",
            name: "Neo Hair Lotion Hair Treatment 120ml",
            description: "Directions 1. Gently comb your hair 2-3 times 2. Spray Neo Hair Lotion on the Scalp 3. Gently comb the whole scalp. Use regularly morning and night",
            price: 653000,
        },
        {
            id: 2,
            passID: "cf-03",
            imageSrc: "https://img.lazcdn.com/g/p/d1e5234d11f115ddc877647fc91ff84b.jpg_200x200q80.jpg_.webp",
            name: "ເກີບແຟຊັ່ນ ຊັ້ນອ່ອນແລະສະດວກສະບາຍ ໃສ່ກັບຊຸດໃດກໍ່ໄດ້ແລ້ວເຈົ້າຈະເບິ່ງດີ. ສາມາດໃສ່ໄດ້ທຸກເພດທຸກໄວ.",
            description: "ຄວາມຫນາຂອງເກີບ 2-2.5 ຊມ. ຜະລິດຈາກວັດສະດຸສັງເຄາະ PVC, ແສງສະຫວ່າງແລະສະດວກສະບາຍ. ສະດວກໃນການເຮັດຄວາມສະອາດ, ແຫ້ງໄວ.",
            price: 85000,
        },
        {
            id: 4,
            passID: "cf-04",
            imageSrc: "https://img.lazcdn.com/g/p/913a50b42f39c9825ac544267badd31f.png_200x200q80.png_.webp",
            name: "ເກີບ Urban Trooper, Original Troopers Leather, Double Charcoal.",
            description: "ເກີບ Urban Trooper ຖືກອອກແບບໃຫ້ໃສ່ໄດ້ທັງຜູ້ຊາຍແລະແມ່ຍິງສີດໍາ (ຖ່ານ) ຮັບປະກັນຄວາມອ່ອນນຸ້ມແລະສະດວກສະບາຍ..",
            price: 249000,
        },
        {
            id: 5,
            passID: "cf-05",
            imageSrc: "https://img.lazcdn.com/g/p/ea4c0b2c36fdc3875fdbce7f021a3ffb.jpg_200x200q80.jpg_.webp",
            name: "COUCOU ອາຫານແມວປຽກ, ອາຫານແມວ, ອາຫານແມວຜູ້ໃຫຍ່, ອາຫານແມວອາວຸໂສ, ສູດໃໝ່, ຂະໜາດ 85 ກຣາມ..",
            description: "ການເພີ່ມນໍ້າໜັກ - Coucou Wet Cat Food Formula 85 ກຣາມ ມີປະໂຫຍດຢູ່ທີ່ Durishi 3 - ບໍ່ມີເຫຼົ້າ - ບໍ່ມີສີ, ລົດຊາດຫຼືສານກັນບູດ.",
            price: 159000,
        },
        {
            id: 6,
            passID: "cf-06",
            imageSrc: "https://img.lazcdn.com/g/ff/kf/S93f41da9a7344681b923ad45bd17af1cb.jpg_200x200q80.jpg_.webp",
            name: "ອາຫານງົວ 2-3 ເດືອນ / 6 ເດືອນຂຶ້ນໄປ, ຂາຍເປັນ 5 ກິໂລ.",
            description: "ອາຫານງົວ 2-3 ເດືອນ / 6 ເດືອນຂຶ້ນໄປ, ຂາຍເປັນ 5 ກິໂລ.ອາຫານງົວ 2-3 ເດືອນ / 6 ເດືອນຂຶ້ນໄປ, ຂາຍເປັນ 5 ກິໂລ..",
            price: 85000,
        }, {
            id: 7,
            passID: "cf-07",
            imageSrc: "https://img.lazcdn.com/g/p/b7c745412778cabd6b00c6fd5810d8b5.jpg_200x200q80.jpg_.webp",
            name: "ຜ້າຍືດຄໍມົນ ພິມກາຕູນງາມ ເສື້ອແຂນສັ້ນ ແຟຊັນເກົາຫຼີ ນຸ່ງໄດ້ທຸກລະດູ, ທຸກສີ, ທຸກຂະໜາດ, ຂາຍຍ່ອຍ ແລະ ຂາຍສົ່ງ.",
            description: "ສິນຄ້າທຸກໂຕໃນຮ້ານແມ່ນຮັບປະກັນຄຸນນະພາບ, ໝັ້ນໃຈໃນການຊື້. ພວກເຮົາຈະໃຫ້ບໍລິການຫຼັງການຂາຍທີ່ສົມບູນແບບ.",
            price: 99000,
        }, {
            id: 8,
            passID: "cf-08",
            imageSrc: "https://img.lazcdn.com/g/p/396b5ead34c462eecd267563c5fae3ec.jpg_200x200q80.jpg_.webp",
            name: "ໂມງ​​ເອ​ເລັກ​ໂຕຣ​ນິກ​ ໂມງສໍາລັບໂມງດິຈິຕອນ, ໂມງແຟຊັ່ນ LED",
            description: "ໂມງສາຍແຂນເອເລັກໂຕຣນິກ, ໂມງແຟຊັ່ນສໍາລັບຜູ້ຊາຍແລະແມ່ຍິງ ໂມງອີເລັກໂທຣນິກ LED Square.",
            price: 355000,
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
                            <button onClick={sendOrder} className='cart-button'>ສັ່ງຊື້ສິນຄ້າໃນກະຕ່າ</button>
                        </div>
                    )}
                </div>
            )}

            <section>
                {products.map((product) => (
                    <div className="phone-card" key={product.id}>
                        <img src={product.imageSrc} alt={product.name} />
                        <h2 className='truncate'>{product.name}</h2>
                        <p>ລາຄາ: {formatPrice(product.price)} ກີບ</p>
                        <p className='truncate'>{product.description}</p>
                        <button onClick={() => addToCart(product)}>ຈັບໃສ່ກະຕ່າ</button>
                    </div>
                ))}
            </section>

            <footer>© ທີມອະນຸລັກສັດປ່າ (ນ້ອງແມວ) 2024</footer>

            <style jsx>{`
.truncate {
     display: -webkit-box;               /* Required for the line clamp to work */
    -webkit-box-orient: vertical;      /* Defines the orientation of the box */
    -webkit-line-clamp: 2;              /* Limits the text to 2 lines */
    overflow: hidden;                    /* Hides the overflow text */
    text-overflow: ellipsis; 
}
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Slightly bigger shadow for a more modern look */
    z-index: 1000;
    max-width: 90%;        /* Limit max width on larger screens */
    width: 100%;           /* Ensures it scales to available space */
    max-height: 90vh;      /* Prevents overflow on smaller screens */
    overflow-y: auto;      /* Enables scrolling if content overflows */
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
    width: 220px;
    height: 210px;
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
.cart-menu {
        max-width: 500px;   /* Sets max width for tablets and up */
    }
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
@media (min-width: 1024px) {
    .cart-menu {
        max-width: 600px;   /* Sets max width for larger screens */
    }
}
@media (max-width: 480px) {
    .phone-card h2 {
        font-size: 18px; /* Smaller heading */
    }
        .cart-menu {
        width: 95%;         /* Full width on very small devices */
        padding: 15px;      /* Reduced padding for smaller viewports */
        border-radius: 4px; /* Smaller border-radius for a tighter feel */
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
