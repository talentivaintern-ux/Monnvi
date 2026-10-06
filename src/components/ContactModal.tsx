import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Order Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received by the Monvi Art concierge team.', 'success');
  };

  const handleClose = () => {
    setSubmitted(false);
    setIsContactOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#F8F3EA] border border-[#E0D4C0] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold">
              Concierge & Inquiries
            </div>
            <h2 className="font-serif text-2xl text-[#292522]">
              Connect with Monvi Art
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#292522]/60 hover:text-[#292522] transition-colors"
            aria-label="Close contact modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Details (5 cols) */}
          <div className="md:col-span-5 space-y-6 text-xs text-[#292522]/80">
            <div>
              <h3 className="font-serif text-base font-semibold text-[#292522] mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#641F2A]" />
                Ateliers & Studios
              </h3>
              <p className="leading-relaxed">
                <strong>Jaipur Atelier:</strong> 44, Civil Lines Craft Enclave, Jaipur, Rajasthan 302006
              </p>
              <p className="leading-relaxed mt-1">
                <strong>New Delhi Bureau:</strong> Defence Colony, New Delhi 110024
              </p>
            </div>

            <div>
              <h3 className="font-serif text-base font-semibold text-[#292522] mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#641F2A]" />
                Direct Communication
              </h3>
              <p>Email: <a href="mailto:concierge@monviart.com" className="text-[#641F2A] hover:underline">concierge@monviart.com</a></p>
              <p>Phone & WhatsApp: <span className="font-mono text-[#292522]">+91 98765 43210</span></p>
            </div>

            <div>
              <h3 className="font-serif text-base font-semibold text-[#292522] mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#641F2A]" />
                Concierge Hours
              </h3>
              <p>Monday to Saturday: 10:00 AM – 7:00 PM IST</p>
              <p className="text-[11px] text-[#292522]/60 mt-0.5">Average email response within 4 hours</p>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="md:col-span-7 bg-white p-6 border border-[#E8DFC8]">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-emerald-50 text-emerald-700 flex items-center justify-center rounded-full border border-emerald-200">
                  <Send className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-[#292522] mb-2">Message Dispatched</h4>
                <p className="text-xs text-[#292522]/70 max-w-xs mx-auto mb-6">
                  Thank you for reaching out. A dedicated concierge associate will connect with you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#641F2A] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Return to Store
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohini Sen"
                    className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rohini@example.com"
                    className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                    Subject / Topic *
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                  >
                    <option value="Order Inquiry">Order Inquiry & Dispatch</option>
                    <option value="Custom Art Commission">Custom Madhubani Art Commission</option>
                    <option value="Artisan Partnership">Artisan Collaboration & Sourcing</option>
                    <option value="Corporate Gifting">Corporate Gifting & Bulk Orders</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements or questions..."
                    className="w-full px-3 py-2 bg-[#F8F3EA] border border-[#D5C6AF] text-xs text-[#292522] focus:border-[#641F2A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#641F2A] hover:bg-[#7D2836] text-[#F8F3EA] text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
