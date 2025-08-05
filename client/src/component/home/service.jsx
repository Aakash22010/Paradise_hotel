const Service = () => (
    <>
      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold text-dark" data-aos="fade-up">
          Our Premium Services
        </h2>
        <div className="row g-4">
          {/* Service 1 */}
          <div className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                className="card-img-top"
                alt="Luxury Room"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h3 className="card-title text-info fw-bold">Elegant Rooms</h3>
                <p className="card-text text-muted">
                  Relax in our beautifully designed rooms with stunning views and modern amenities.
                </p>
                <button type="button" className="custom-explore-button">
                  Explore Rooms
                </button>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                className="card-img-top"
                alt="Fine Dining"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h3 className="card-title text-success fw-bold">Fine Dining</h3>
                <p className="card-text text-muted">
                  Enjoy gourmet cuisine at our world-class restaurants and bars.
                </p>
                <button type="button" className="custom-view-button">
                  View Restaurants
                </button>
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                className="card-img-top"
                alt="Special Offers"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h3 className="card-title text-warning fw-bold">Exclusive Offers</h3>
                <p className="card-text text-muted">
                  Book now and get exclusive deals on your stay and experiences.
                </p>
                <button type="button" className="custom-offer-button">
                  View Offers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
);

export default Service;