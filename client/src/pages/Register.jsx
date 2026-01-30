import React from 'react';
import { useState , useEffect} from 'react';
import {z} from 'zod'
import { NavLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { useDispatch,useSelector } from 'react-redux';
import { registerUser } from '../stores/authSlice';

const registerSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 letters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});


export default function RegisterPage() {
  // eslint-disable-next-line no-unused-vars
  const [showPassword, setShowPassword] = useState(false);
   const [focusedField, setFocusedField] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
  if (isAuthenticated) navigate("/login");
}, [isAuthenticated, navigate]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  const handleGoogle = () => {
    alert("Mock: Launch Google OAuth flow");
  };
  const handleGithub = () => {
    alert("Mock: Launch Github OAuth flow");
  };

//   const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;800&family=Covered+By+Your+Grace&display=swap');
        
        * {
          font-family: 'Raleway', sans-serif;
        }
        
        .font-handwritten {
          font-family: 'Covered By Your Grace', cursive;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-30px) rotate(5deg); 
          }
        }

        @keyframes spin3d {
          0% { 
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg); 
          }
          100% { 
            transform: perspective(1000px) rotateY(360deg) rotateX(360deg); 
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes orbitRotate {
          from {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin3d {
          animation: spin3d 20s linear infinite;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbitRotate 15s linear infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .input-glow:focus {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }

        .mesh-gradient {
          background: 
            radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.2) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.2) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.2) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(251, 191, 36, 0.2) 0px, transparent 50%);
        }
      `}</style>

      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 mesh-gradient opacity-50"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow delay-100"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow delay-200"></div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl w-full">
            
            {/* Left Side - 3D Graphics & Text */}
            <div className="space-y-8 animate-slideInLeft">
              {/* Brand/Logo */}
              <div className="opacity-0 animate-fadeInUp">
                <div className="inline-block px-4 py-2 rounded-full glass-effect border border-emerald-400/30">
                  <span className="text-emerald-400 text-sm font-semibold tracking-wider">✦ WELCOME TO THE FUTURE</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-tight opacity-0 animate-fadeInUp delay-100">
                Create Your
                <span className="block mt-2 bg-linear-to-r from-emerald-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                  Own Notes 🥢 
                </span>
             
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed opacity-0 animate-fadeInUp delay-200">
                Join thousands of people building the next generation of experiences. Your journey starts here.
              </p>

              {/* 3D Graphic Container */}
              <div className="relative h-80 opacity-0 animate-scaleIn delay-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Main 3D Cube */}
                  <div className="relative w-64 h-64" style={{ perspective: '1000px' }}>
                    <div className="absolute inset-0 animate-spin3d" style={{ transformStyle: 'preserve-3d' }}>
                      {/* Cube Faces */}
                      <div className="absolute w-48 h-48 glass-effect border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 font-bold text-2xl"
                           style={{ transform: 'translateZ(96px)' }}>
                        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 112 0v3a1 1 0 11-2 0v-3zm1-6a1 1 0 011 1v1a1 1 0 11-2 0V6a1 1 0 011-1z"/>
                        </svg>
                      </div>
                      <div className="absolute w-48 h-48 glass-effect border-2 border-blue-400/50"
                           style={{ transform: 'translateZ(-96px) rotateY(180deg)' }}></div>
                      <div className="absolute w-48 h-48 glass-effect border-2 border-pink-400/50"
                           style={{ transform: 'rotateY(90deg) translateZ(96px)' }}></div>
                      <div className="absolute w-48 h-48 glass-effect border-2 border-yellow-400/50"
                           style={{ transform: 'rotateY(-90deg) translateZ(96px)' }}></div>
                      <div className="absolute w-48 h-48 glass-effect border-2 border-purple-400/50"
                           style={{ transform: 'rotateX(90deg) translateZ(96px)' }}></div>
                      <div className="absolute w-48 h-48 glass-effect border-2 border-orange-400/50"
                           style={{ transform: 'rotateX(-90deg) translateZ(96px)' }}>
                           </div>
                    </div>
                  </div>

                  {/* Orbiting Particles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-emerald-400 rounded-full animate-orbit shadow-lg shadow-emerald-400/50"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '5s' }}>
                    <div className="w-15 h-15 bg-blue-400 rounded-full animate-orbit shadow-lg shadow-blue-400/50"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '10s' }}>
                    <div className="w-15 h-15 bg-pink-400 rounded-full animate-orbit shadow-lg shadow-pink-400/50"><img
                              src="/src/assets/images.jpeg"
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                            /></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 glass-effect rounded-2xl border border-white/20 animate-float"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 glass-effect rounded-full border border-white/20 animate-float delay-200"></div>
              </div>

            </div>

            {/* Right Side - Registration Form */}
            <div className="opacity-0 animate-slideInRight">
              <div className="glass-effect rounded-3xl p-10 shadow-2xl border border-white/10 backdrop-blur-xl">

                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-white mb-3">Get Started</h2>
                  <p className="text-slate-400">Create your account in seconds</p>
                </div>

               
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         
                  <div className="space-y-2 opacity-0 animate-fadeInUp delay-100">
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-300 tracking-wide">
                      FULL NAME
                    </label>
                    <div className="relative">
                      <input
                       type="text"
                        {...register('name')}
                        placeholder="John Doe"
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-5 py-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 input-glow"
                      />
                        {errors.name && (
                        <p className="text-red-400 text-sm">{errors.name.message}</p>
                        )}
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedField === 'name' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

              
                  <div className="space-y-2 opacity-0 animate-fadeInUp delay-200">
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-300 tracking-wide">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 input-glow"
                      />
                        {errors.email && (
                            <p className="text-red-400 text-sm">{errors.email.message}</p>
                        )}
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedField === 'email' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                 
                  <div className="space-y-2 opacity-0 animate-fadeInUp delay-300">
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-300 tracking-wide">
                      PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Enter password"
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-5 py-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all duration-300 input-glow"
                      />
                        {errors.password && (
                        <p className="text-red-400 text-sm">{errors.password.message}</p>
                        )}
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedField === 'password' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Must be at least 8 characters</p>
                  </div>

            
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-[1.02] transition-all duration-300 opacity-0 animate-fadeInUp delay-400"
                  >
                    Create Account
                  </button>


                  <div className="relative my-8 opacity-0 animate-fadeInUp delay-400">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-slate-900/50 text-slate-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 opacity-0 animate-fadeInUp delay-400">
                    <button
                        onClick={handleGoogle}
                      type="button"
                      className="flex items-center justify-center gap-3 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-slate-300 font-medium">Google</span>
                    </button>
                    <button
                        onClick={handleGithub}
                        type="button"
                        className="flex items-center justify-center gap-3 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="text-slate-300 font-medium">GitHub</span>
                    </button>
                  </div>

       
                  <p className="text-center text-slate-400 text-sm mt-6 opacity-0 animate-fadeInUp delay-400">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                      Sign in
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}