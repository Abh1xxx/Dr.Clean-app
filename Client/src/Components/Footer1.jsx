import React from "react";

function Footer1() {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-4">Dr. Clean Facility Management</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Professional cleaning services for homes, offices and commercial spaces in
            Cherthala and Alappuzha.
          </p>

          <div className="mt-4 space-y-1 text-sm text-white/90">
            <p>Phone: 9645659427</p>
            <p>Phone: 9847093666</p>
            <p>Location: Cherthala, Alappuzha, Kerala - 688526</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <div className="space-y-2 text-sm text-white/80">
            <p>Working Hours: Mon - Sat, 8:00 AM to 7:00 PM</p>
            <p>Service Area: Cherthala, Alappuzha and nearby locations</p>
            <p>Email: support@drclean.in</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Dr. Clean Facility Management Service. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer1;
