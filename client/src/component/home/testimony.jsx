import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const Testimony = () => {
  const [testimonies] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      message: "I am extremely pleased with the services provided by My ITar Online. The team is professional, knowledgeable, I highly recommend My ITR Online to anyone looking for reliable and expert accounting services. ",
      rating: 5,
      location: "New York",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      message: "My ITR Online has been my trusted service advisor for over a decade. The team is well experienced and well versed with all aspects of tax advise and ITR filing..Thank you for on time, seamless and excellent customer experience",
      rating: 5,
      location: "London",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      message: "I am extremely pleased with the services provided by My ITar Online. The team is professional, knowledgeable, I highly recommend My ITR Online to anyone looking for reliable and expert accounting services and tax filing.",
      rating: 4,
      location: "Paris",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 4,
      name: "David Wilson",
      message: "My itr online is one of the most secure easy efficient effortless ways to file income taxes year on year. Filing with them you feel you are being dealt with by an absolute expert in tax filing and whatever is the best thing for you, they will do. I am very very satisfied and grateful.",
      rating: 5,
      location: "Toronto",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 5,
      name: "Priya Patel",
      message: "Beautiful rooms with stunning views. The housekeeping was exceptional. The staff was friendly and attentive, making our stay truly memorable. I highly recommend this hotel for a relaxing getaway.Beautiful rooms with stunning views. The housekeeping was exceptional.",
      rating: 5,
      location: "Mumbai",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 6,
      name: "James Brown",
      message: "The pool area was fantastic and never crowded. Perfect relaxation spot. The staff was friendly and attentive, making our stay truly memorable. I highly recommend this hotel for a relaxing getaway. Beautiful rooms with stunning views. The housekeeping was exceptional. ",
      rating: 4,
      location: "Sydney",
      image: "https://randomuser.me/api/portraits/men/36.jpg"
    }
  ]);

  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const testimonyChunks = chunkArray(testimonies, 2);

  return (
    <section className="bg-dark text-white py-5">
      <div className="container py-4">
        <h2 className="text-center mb-5 fw-bold" data-aos="fade-up">What Our Guests Say</h2>
        
        <Carousel 
          indicators={false} 
          controls={false}
          interval={5000} 
          pause={'hover'}
          variant="dark"
          className="testimonial-carousel"
        >
          {testimonyChunks.map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="row justify-content-center">
                {chunk.map((testimony) => (
                  <div key={testimony.id} className="col-md-6 mb-4" data-aos="fade-up">
                    <div className="card bg-secondary border-0 h-100 mx-2">
                      <div className="card-body p-4">
                        <div className="mb-3 text-warning">
                          {[...Array(testimony.rating)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                          {[...Array(5 - testimony.rating)].map((_, i) => (
                            <i key={`empty-${i}`} className="bi bi-star"></i>
                          ))}
                        </div>
                        <p className="card-text fst-italic">"{testimony.message}"</p>
                        <div className="d-flex align-items-center mt-3">
                          <img 
                            src={testimony.image} 
                            className="rounded-circle me-3" 
                            width="50" 
                            alt={testimony.name}
                          />
                          <div>
                            <h6 className="mb-0">{testimony.name}</h6>
                            <small className="text-light">{testimony.location}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Custom CSS for carousel controls and responsive behavior */}
        <style>{`
          .testimonial-carousel .carousel-control-prev,
          .testimonial-carousel .carousel-control-next {
            width: 5%;
          }
          .testimonial-carousel .carousel-indicators button {
            background-color: rgba(255,255,255,0.5);
          }
          .testimonial-carousel .carousel-indicators button.active {
            background-color: #fff;
          }
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            filter: invert(1);
          }
          @media (max-width: 768px) {
            .testimonial-carousel .card {
              margin-bottom: 15px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

export default Testimony;