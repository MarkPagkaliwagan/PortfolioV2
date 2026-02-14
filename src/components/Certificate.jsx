import React, { useState } from "react";

// CERTIFICATE IMAGES
import cert1 from "../assets/certificate/cert1.jpg";
import cert2 from "../assets/certificate/cert2.png";
import cert3 from "../assets/certificate/cert3.png";
import cert4 from "../assets/certificate/cert4.png";
import cert5 from "../assets/certificate/cert5.png";
import cert6 from "../assets/certificate/cert6.png";
import cert7 from "../assets/certificate/cert7.png";
import cert8 from "../assets/certificate/cert8.png";
import cert9 from "../assets/certificate/cert9.png";
import cert10 from "../assets/certificate/cert10.png";
import cert11 from "../assets/certificate/cert11.png";
import cert12 from "../assets/certificate/cert12.png";

export default function Certificate({ darkMode }) {
  const certificates = [cert1, cert2, cert3, cert4, cert5, cert6, cert7, cert8, cert9, cert10, cert11, cert12];
  const loopImages = [...certificates, ...certificates];

  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section className="w-full mx-auto px-4 md:px-8 py-2">
      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight text-center sm:text-left">
        Certificates
      </h2>

      {/* OUTER CARD */}
      
      <div
        className={`
          rounded-2xl border-2 p-6 md:p-8 overflow-hidden
          transition-all duration-300
          border-blue-500/50
          bg-transparent
        `}
      >
        {/* SLIDESHOW ROWS */}
        <div className="space-y-8">
          {[1, 2, 3].map((row, index) => (
            <div key={row} className="relative overflow-hidden">
              <div
                className={`flex gap-8 w-max ${
                  index % 2 === 1 ? "animate-slide-reverse" : "animate-slide"
                }`}
              >
                {loopImages.map((img, i) => (
                  <div
                    key={i}
                    className={`
                      rounded-xl p-2 border-2 border-blue-500/50
                      transition-all duration-300
                      cursor-pointer
                      bg-transparent
                      hover:border-blue-400
                    `}
                    onClick={() => setSelectedCert(img)}
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={img}
                        alt="Certificate"
                        className="
                          w-64 h-40 object-cover
                          transition-all duration-300
                          brightness-75 grayscale-[20%]
                          hover:brightness-100 hover:grayscale-0
                        "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-SIZE MODAL */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCert(null)}
        >
          <img
            src={selectedCert}
            alt="Certificate Full View"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-xl"
          />
        </div>
      )}
    </section>
  );
}
