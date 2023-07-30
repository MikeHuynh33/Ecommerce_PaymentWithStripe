function Cancel() {
  return (
    <div class="flex items-center justify-center h-screen">
      <div>
        <div class="flex bg-white p-10  flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red"
            width="164"
            height="164"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01M12 5a9 9 0 110 18 9 9 0 010-18zm0 0v6m0 4h.01m0 4h.01"
            />
          </svg>
          <h1 class="text-4xl font-bold">
            Thank You ! But Transaction did not go through
          </h1>
          <p>Sorry Your Order was cancelled , Please try agin.</p>
          <a class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <a href="." class="text-sm font-medium">
              Home
            </a>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
