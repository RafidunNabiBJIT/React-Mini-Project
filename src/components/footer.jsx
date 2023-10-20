
function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>BJIT Ltd.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec venenatis.</p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <address>
              123 Main Street<br />
              City, State ZIP<br />
              Phone: (123) 456-7890<br />
              Email: info@example.com
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
