// Hospital and Doctor Data
const hospitalsData = [
    {
        id: 1,
        name: "Makati Life Medical Center",
        location: "Makati City",
        specialties: ["Cardiology", "Orthopedics", "Pediatrics", "Dermatology"],
        doctors: [
            {
                id: 1,
                name: "Dr. Jose Dela Cruz",
                specialty: "Cardiology",
                available: true,
                schedule: "Mon-Fri 9AM-5PM",
                experience: "15 years",
                description: "Board-certified cardiologist specializing in interventional cardiology and preventive care."
            },
            {
                id: 2,
                name: "Dr. Maria Santos",
                specialty: "Pediatrics",
                available: true,
                schedule: "Mon-Sat 8AM-6PM",
                experience: "12 years",
                description: "Experienced pediatrician with expertise in child development and preventive medicine."
            },
            {
                id: 3,
                name: "Dr. Roberto Garcia",
                specialty: "Orthopedics",
                available: false,
                schedule: "Tue-Thu 10AM-4PM",
                experience: "18 years",
                description: "Orthopedic surgeon specializing in sports medicine and joint replacement."
            }
        ]
    },
    {
        id: 2,
        name: "St. Luke's Medical Center",
        location: "Quezon City",
        specialties: ["Neurology", "Oncology", "Cardiology", "General Surgery"],
        doctors: [
            {
                id: 4,
                name: "Dr. Ana Rodriguez",
                specialty: "Neurology",
                available: true,
                schedule: "Mon-Fri 8AM-4PM",
                experience: "20 years",
                description: "Neurologist with expertise in stroke treatment and neurological disorders."
            },
            {
                id: 5,
                name: "Dr. Carlos Mendoza",
                specialty: "Oncology",
                available: true,
                schedule: "Mon-Sat 9AM-5PM",
                experience: "16 years",
                description: "Medical oncologist specializing in cancer treatment and chemotherapy."
            }
        ]
    },
    {
        id: 3,
        name: "Philippine General Hospital",
        location: "Manila",
        specialties: ["Emergency Medicine", "Internal Medicine", "Surgery", "Obstetrics"],
        doctors: [
            {
                id: 6,
                name: "Dr. Elena Torres",
                specialty: "Emergency Medicine",
                available: true,
                schedule: "24/7 Emergency",
                experience: "14 years",
                description: "Emergency medicine specialist with extensive experience in trauma care."
            },
            {
                id: 7,
                name: "Dr. Miguel Lopez",
                specialty: "Internal Medicine",
                available: false,
                schedule: "Mon-Fri 7AM-3PM",
                experience: "13 years",
                description: "Internal medicine specialist focusing on adult primary care and chronic disease management."
            }
        ]
    },
    {
        id: 4,
        name: "Cebu Doctors' University Hospital",
        location: "Cebu City",
        specialties: ["Cardiology", "Dermatology", "Ophthalmology", "ENT"],
        doctors: [
            {
                id: 8,
                name: "Dr. Sofia Reyes",
                specialty: "Dermatology",
                available: true,
                schedule: "Mon-Sat 9AM-6PM",
                experience: "11 years",
                description: "Dermatologist specializing in cosmetic dermatology and skin cancer treatment."
            },
            {
                id: 9,
                name: "Dr. Antonio Cruz",
                specialty: "Ophthalmology",
                available: true,
                schedule: "Mon-Fri 8AM-5PM",
                experience: "17 years",
                description: "Ophthalmologist with expertise in cataract surgery and retinal diseases."
            }
        ]
    },
    {
        id: 5,
        name: "Davao Doctors Hospital",
        location: "Davao City",
        specialties: ["Cardiology", "Orthopedics", "Pediatrics", "Psychiatry"],
        doctors: [
            {
                id: 10,
                name: "Dr. Patricia Lim",
                specialty: "Psychiatry",
                available: true,
                schedule: "Mon-Fri 10AM-6PM",
                experience: "19 years",
                description: "Psychiatrist specializing in adult and child mental health disorders."
            },
            {
                id: 11,
                name: "Dr. Ferdinand Santos",
                specialty: "Cardiology",
                available: false,
                schedule: "Tue-Sat 8AM-4PM",
                experience: "22 years",
                description: "Interventional cardiologist with expertise in complex cardiac procedures."
            }
        ]
    }
];

// DOM Elements
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayHospitals();
    setupEventListeners();
    setupFormHandlers();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    const hospitalSearch = document.getElementById('hospitalSearch');
    if (hospitalSearch) {
        hospitalSearch.addEventListener('input', filterHospitals);
    }

    // Filter functionality
    const specialtyFilter = document.getElementById('specialtyFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', filterHospitals);
    }
    if (locationFilter) {
        locationFilter.addEventListener('change', filterHospitals);
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Setup Form Handlers
function setupFormHandlers() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}

// Display Hospitals
function displayHospitals(filteredData = null) {
    const hospitalsGrid = document.getElementById('hospitalsGrid');
    if (!hospitalsGrid) return;

    const dataToDisplay = filteredData || hospitalsData;
    
    hospitalsGrid.innerHTML = dataToDisplay.map(hospital => `
        <div class="hospital-card">
            <div class="hospital-image">
                <i class="fas fa-hospital"></i>
            </div>
            <div class="hospital-content">
                <h3>${hospital.name}</h3>
                <div class="hospital-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${hospital.location}</span>
                </div>
                <div class="hospital-specialties">
                    ${hospital.specialties.map(specialty => 
                        `<span class="specialty-tag">${specialty}</span>`
                    ).join('')}
                </div>
                <div class="hospital-doctors">
                    <h4>Available Doctors:</h4>
                    ${hospital.doctors.map(doctor => `
                        <div class="doctor-item">
                            <div class="doctor-info">
                                <h4>${doctor.name}</h4>
                                <p>${doctor.specialty}</p>
                            </div>
                            <div class="doctor-availability">
                                <span class="availability-badge ${doctor.available ? 'available' : 'unavailable'}">
                                    ${doctor.available ? 'Available' : 'Unavailable'}
                                </span>
                                ${doctor.available ? 
                                    `<button class="book-btn" onclick="viewDoctorDetails(${doctor.id})">Book</button>` : 
                                    ''
                                }
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Hospitals
function filterHospitals() {
    const searchTerm = document.getElementById('hospitalSearch')?.value.toLowerCase() || '';
    const specialtyFilter = document.getElementById('specialtyFilter')?.value || '';
    const locationFilter = document.getElementById('locationFilter')?.value || '';

    let filteredData = hospitalsData.filter(hospital => {
        const matchesSearch = hospital.name.toLowerCase().includes(searchTerm) ||
                             hospital.location.toLowerCase().includes(searchTerm);
        
        const matchesSpecialty = !specialtyFilter || 
                                hospital.specialties.some(specialty => 
                                    specialty.toLowerCase() === specialtyFilter.toLowerCase()
                                );
        
        const matchesLocation = !locationFilter || 
                               hospital.location.toLowerCase() === locationFilter.toLowerCase();

        return matchesSearch && matchesSpecialty && matchesLocation;
    });

    displayHospitals(filteredData);
}

// View Doctor Details
function viewDoctorDetails(doctorId) {
    const doctor = findDoctorById(doctorId);
    if (!doctor) return;

    const modalContent = document.getElementById('doctorModalContent');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="doctor-details">
                <div class="doctor-info-section">
                    <div class="doctor-image">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div class="doctor-info">
                        <h3>${doctor.name}</h3>
                        <div class="doctor-specialty">${doctor.specialty}</div>
                        <p class="doctor-description">${doctor.description}</p>
                        <p><strong>Experience:</strong> ${doctor.experience}</p>
                    </div>
                </div>
                <div class="doctor-booking-section">
                    <div class="availability-schedule">
                        <h4>Schedule & Availability</h4>
                        <div class="schedule-item">
                            <span>Schedule:</span>
                            <span>${doctor.schedule}</span>
                        </div>
                        <div class="schedule-item">
                            <span>Status:</span>
                            <span class="availability-badge ${doctor.available ? 'available' : 'unavailable'}">
                                ${doctor.available ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                    </div>
                    ${doctor.available ? `
                        <div class="booking-form">
                            <h4>Book Appointment</h4>
                            <form id="bookingForm">
                                <div class="form-group">
                                    <label for="appointmentDate">Preferred Date:</label>
                                    <input type="date" id="appointmentDate" required min="${new Date().toISOString().split('T')[0]}">
                                </div>
                                <div class="form-group">
                                    <label for="appointmentTime">Preferred Time:</label>
                                    <select id="appointmentTime" required>
                                        <option value="">Select time</option>
                                        <option value="09:00">9:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="14:00">2:00 PM</option>
                                        <option value="15:00">3:00 PM</option>
                                        <option value="16:00">4:00 PM</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="appointmentReason">Reason for Visit:</label>
                                    <textarea id="appointmentReason" rows="3" placeholder="Please describe your symptoms or reason for visit"></textarea>
                                </div>
                                <button type="submit" class="btn-primary">Confirm Booking</button>
                            </form>
                        </div>
                    ` : `
                        <div class="unavailable-message">
                            <p>Dr. ${doctor.name} is currently unavailable. Please check back later or contact the hospital for alternative arrangements.</p>
                        </div>
                    `}
                </div>
            </div>
        `;

        // Setup booking form handler
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', handleBooking);
        }
    }

    openModal('doctorModal');
}

// Find Doctor by ID
function findDoctorById(doctorId) {
    for (const hospital of hospitalsData) {
        const doctor = hospital.doctors.find(d => d.id === doctorId);
        if (doctor) return doctor;
    }
    return null;
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    openModal(toModalId);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate login
    currentUser = { email, name: email.split('@')[0] };
    alert('Login successful! Welcome back, ' + currentUser.name);
    closeModal('loginModal');
    updateAuthUI();
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // Simulate signup
    currentUser = { email, name, phone };
    alert('Account created successfully! Welcome to Quick Med, ' + name);
    closeModal('signupModal');
    updateAuthUI();
}

function handleContact(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') || 'Anonymous';
    
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}

function handleBooking(e) {
    e.preventDefault();
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const reason = document.getElementById('appointmentReason').value;

    if (!currentUser) {
        alert('Please login to book an appointment');
        closeModal('doctorModal');
        openModal('loginModal');
        return;
    }

    // Simulate booking
    alert(`Appointment booked successfully!\n\nDate: ${date}\nTime: ${time}\n\nWe will send you a confirmation email shortly.`);
    closeModal('doctorModal');
}

// Update Auth UI
function updateAuthUI() {
    const navAuth = document.querySelector('.nav-auth');
    if (navAuth && currentUser) {
        navAuth.innerHTML = `
            <span class="user-welcome">Welcome, ${currentUser.name}</span>
            <button class="btn-logout" onclick="logout()">Logout</button>
        `;
    } else if (navAuth) {
        navAuth.innerHTML = `
            <button class="btn-login" onclick="openModal('loginModal')">Login</button>
            <button class="btn-signup" onclick="openModal('signupModal')">Sign Up</button>
        `;
    }
}

// Logout Function
function logout() {
    currentUser = null;
    updateAuthUI();
    alert('Logged out successfully');
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
    
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

// Add some CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
    
    .user-welcome {
        color: var(--primary-color);
        font-weight: 500;
        margin-right: 1rem;
    }
    
    .btn-logout {
        background: #dc2626;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
    }
    
    .btn-logout:hover {
        background: #b91c1c;
    }
    
    .unavailable-message {
        background: #fef2f2;
        border: 1px solid #fecaca;
        padding: 1rem;
        border-radius: 8px;
        color: #991b1b;
    }
    
    .booking-form {
        margin-top: 1.5rem;
    }
    
    .booking-form h4 {
        margin-bottom: 1rem;
        color: var(--text-dark);
    }
`;
document.head.appendChild(style); 