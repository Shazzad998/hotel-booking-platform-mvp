import { home } from "@/routes";
import { Link } from "@inertiajs/react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-8">
      <div className="px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Social */}
          <div className="flex flex-col items-start space-y-4">
            <Link href={home()}><img src="/images/logo.svg" alt="" className="h-12 w-20 object-contain" /></Link>
            <div className="flex space-x-3">
              <a href="#" className="p-2 border rounded-lg text-blue-500 hover:bg-blue-50">
                <FacebookIcon/>
              </a>
              <a href="#" className="p-2 border rounded-lg text-pink-500 hover:bg-pink-50">
                <InstagramIcon/>
              </a>
              <a href="#" className="p-2 border rounded-lg text-blue-700 hover:bg-blue-50">
                <LinkedinIcon/>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#">About VervTrip</a></li>
              <li><a href="#">Booking Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Investors</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#">Hot Deals</a></li>
              <li><a href="#">Read Our Blogs</a></li>
              <li><a href="#">Track Bookings</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#">My Bookings</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t mt-10 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-center items-center">
          <p>Copyright © 2025 VervTrip Limited, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
