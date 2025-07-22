import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      title: 'Phone',
      value: '+62 123 456 7890',
      description: 'Call us for immediate support',
      color: '#16a34a'
    },
    {
      icon: <Mail size={20} />,
      title: 'Email',
      value: 'support@agrodecide.com',
      description: 'Send us your questions',
      color: '#2563eb'
    },
    {
      icon: <MapPin size={20} />,
      title: 'Location',
      value: 'Yogyakarta, Indonesia',
      description: 'Visit our office',
      color: '#dc2626'
    },
    {
      icon: <Clock size={20} />,
      title: 'Office Hours',
      value: 'Mon-Fri: 9:00-17:00',
      description: 'Saturday: 9:00-13:00',
      color: '#d97706'
    }
  ];

  const supportTypes = [
    {
      icon: <MessageSquare size={24} />,
      title: 'General Inquiry',
      description: 'Questions about AgroDecide features and capabilities'
    },
    {
      icon: <Phone size={24} />,
      title: 'Technical Support',
      description: 'Help with using the recommendation system'
    },
    {
      icon: <Mail size={24} />,
      title: 'Agricultural Consultation',
      description: 'Expert advice on crop selection and farming'
    }
  ];

  return (
    <div className="page">
      <section className="page-section">
        <div className="container">
          <div className="card" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
              Contact AgroDecide
            </h1>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '40px', 
              textAlign: 'center',
              fontSize: '18px',
              lineHeight: '1.6'
            }}>
              Have questions about our crop recommendation system? Need support or want to learn more? 
              We're here to help you make the best agricultural decisions.
            </p>
            
            {/* Contact Info Cards */}
            <div className="grid grid-4" style={{ marginBottom: '50px' }}>
              {contactInfo.map((info, index) => (
                <div key={index} style={{
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: `${info.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    {React.cloneElement(info.icon, { color: info.color })}
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '8px'
                  }}>
                    {info.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: info.color,
                    marginBottom: '4px'
                  }}>
                    {info.value}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    {info.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-2" style={{ gap: '40px' }}>
              {/* Contact Form */}
              <div>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '16px' 
                }}>
                  Send us a Message
                </h2>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '24px',
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="What is this about?"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="form-input form-textarea"
                      placeholder="Please describe your question or feedback..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-full"
                    style={{ marginTop: '10px' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid #ffffff',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              {/* Support Types */}
              <div>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '16px' 
                }}>
                  How Can We Help?
                </h2>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '24px',
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}>
                  Choose the type of support you need and we'll connect you with the right expert.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {supportTypes.map((type, index) => (
                    <div key={index} style={{
                      padding: '20px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          backgroundColor: '#16a34a15',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {React.cloneElement(type.icon, { color: '#16a34a', size: 20 })}
                        </div>
                        <div>
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '4px'
                          }}>
                            {type.title}
                          </h3>
                          <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            lineHeight: '1.4'
                          }}>
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FAQ Section */}
                <div style={{ marginTop: '30px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '16px'
                  }}>
                    Frequently Asked Questions
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <details style={{
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff'
                    }}>
                      <summary style={{
                        fontWeight: '500',
                        color: '#111827',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        How accurate are the crop recommendations?
                      </summary>
                      <p style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: '#6b7280',
                        lineHeight: '1.4'
                      }}>
                        Our system has a 95% accuracy rate based on MADM validation and real agricultural data from Indonesia.
                      </p>
                    </details>
                    
                    <details style={{
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff'
                    }}>
                      <summary style={{
                        fontWeight: '500',
                        color: '#111827',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        Can I use this for any region in Indonesia?
                      </summary>
                      <p style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: '#6b7280',
                        lineHeight: '1.4'
                      }}>
                        Yes, the system is designed for Indonesian agricultural conditions and can be adapted to different regions.
                      </p>
                    </details>
                    
                    <details style={{
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff'
                    }}>
                      <summary style={{
                        fontWeight: '500',
                        color: '#111827',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        Is there a cost to use AgroDecide?
                      </summary>
                      <p style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: '#6b7280',
                        lineHeight: '1.4'
                      }}>
                        The basic recommendation system is free to use. Contact us for enterprise features and consulting services.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div style={{
              marginTop: '40px',
              padding: '20px',
              backgroundColor: '#f0fdf4',
              borderRadius: '8px',
              border: '1px solid #dcfce7'
            }}>
              <h3 style={{ 
                fontWeight: '600', 
                color: '#166534', 
                marginBottom: '8px',
                fontSize: '16px'
              }}>
                🚨 Urgent Agricultural Support
              </h3>
              <p style={{ 
                color: '#15803d', 
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                For immediate assistance with critical crop decisions or urgent technical issues, 
                please call our emergency hotline at <strong>+62 123 456 7890</strong> or send an email 
                with "URGENT" in the subject line. Our agricultural experts are available 24/7 
                for emergency consultations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Animation CSS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        details summary {
          list-style: none;
        }
        
        details summary::-webkit-details-marker {
          display: none;
        }
        
        details summary::before {
          content: '▶';
          margin-right: 8px;
          transition: transform 0.2s ease;
        }
        
        details[open] summary::before {
          transform: rotate(90deg);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;