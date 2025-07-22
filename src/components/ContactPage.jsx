import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="page">
      <section className="page-section">
        <div className="container">
          <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
              Contact Us
            </h1>
            
            <div className="grid grid-2">
              <div>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '16px' 
                }}>
                  Get in Touch
                </h2>
                <p style={{ 
                  color: '#6b7280', 
                  marginBottom: '24px', 
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  Have questions about AgroDecide or need support with crop recommendations? 
                  We're here to help you make the best agricultural decisions.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={20} color="#16a34a" />
                    <span style={{ color: '#6b7280', fontSize: '16px' }}>+62 123 456 7890</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Mail size={20} color="#16a34a" />
                    <span style={{ color: '#6b7280', fontSize: '16px' }}>support@agrodecide.com</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={20} color="#16a34a" />
                    <span style={{ color: '#6b7280', fontSize: '16px' }}>Yogyakarta, Indonesia</span>
                  </div>
                </div>
                
                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#111827', 
                    marginBottom: '12px' 
                  }}>
                    Office Hours
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              
              <div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '20px' 
                }}>
                  Send us a Message
                </h3>
                
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="What is this about?"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      rows={5}
                      className="form-input form-textarea"
                      placeholder="Please describe your question or feedback..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            
            <div style={{
              marginTop: '40px',
              padding: '20px',
              backgroundColor: '#f0fdf4',
              borderRadius: '8px'
            }}>
              <h3 style={{ 
                fontWeight: '600', 
                color: '#166534', 
                marginBottom: '8px',
                fontSize: '16px'
              }}>
                Quick Support
              </h3>
              <p style={{ 
                color: '#15803d', 
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                For immediate assistance with technical issues or urgent crop recommendations, 
                please call our support hotline or send an email with "URGENT" in the subject line.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;