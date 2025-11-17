

// -- Komponen Footer --
const Footer = () => {
  return (
    <footer className="bg-black py-10">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <div className="flex justify-center space-x-6 mb-6">
                <a
  href="https://www.instagram.com/antariks.corp/"
  target="_blank"
  className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
  aria-label="Instagram"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37a4 4 0 1 1-7.99 0 4 4 0 0 1 7.99 0z"></path>
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
  </svg>
</a>

          <a
            href="https://www.linkedin.com/company/antariks/"
            target="_blank"
            className="text-gray-400 hover:text-green-400 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              ></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Antariks. all right reserved
        </p>
      </div>
    </footer>
  );
};
export default Footer