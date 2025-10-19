export default function ShipmentData() {
  return (
    <section className="grid grid-cols-4 py-4 gap-6">
      <div className="px-6 shadow-md py-6 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm uppercase text-stone-500">
            Shipments in Progress
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="rgb(25,52,85)"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
        </div>

        <p className="font-bold text-3xl text-[rgb(25,52,85)] mb-2">23</p>
        <p className="font-semibold text-green-600">+5% vs last month</p>
      </div>

      <div className="px-6 shadow-md py-6 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm uppercase text-stone-500">
            Deliveries this month
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(25,52,85)"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4a2 2 0 001-1.73z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.3 7.7L12 12l8.7-4.3M12 22V12"
            />
          </svg>
        </div>

        <p className="font-bold text-3xl text-[rgb(25,52,85)] mb-2">45</p>
        <p className="font-semibold text-green-600">+8% vs last month</p>
      </div>
      <div className="px-6 shadow-md py-6 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm uppercase text-stone-500">
            Pending & Failed Shipments
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="rgb(25,52,85)"
            strokeWidth="2"
            className="w-8 h-8 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3.75a8.25 8.25 0 110 16.5 8.25 8.25 0 010-16.5z"
            />
          </svg>
        </div>

        <p className="font-bold text-3xl text-[rgb(25,52,85)] mb-2">10</p>
        <p className="font-semibold text-stone-500">
          <span className="text-orange-600">Notice:</span> High volume
        </p>
      </div>
      <div className="px-6 shadow-md py-6 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm uppercase text-stone-500">Active markets</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="rgb(25,52,85)"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>

        <p className="font-bold text-3xl text-[rgb(25,52,85)] mb-2">6</p>
        <p className="font-semibold text-stone-500">
          <span className="text-green-600">+2</span> New markets this month
        </p>
      </div>
    </section>
  );
}
