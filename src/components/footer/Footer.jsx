import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { IMAGE_PATHS } from "../../common/ImageConstant";

export default function Footer() {
  return (
    <footer className="bg-[#1A3C57] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-10">
          
          {/* Logo Section */}
          <div className="flex items-start">
            <img
              src={IMAGE_PATHS.backgroundremovelogo}
              alt="JyaanBanau"
              className="h-24 md:h-32 lg:h-36 object-contain" 
            />
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Social Media</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-200 hover:text-white transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-200 hover:text-white transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-200 hover:text-white transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-200 hover:text-white transition"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-200 text-sm text-center">
            © 2025 JyaanBanau. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
