export default function CreativeInvoiceBox() {
    return (
        <>
            <div className="p-6 bg-gray-100 rounded-4xl text-center mx-4 lg:mx-0">
                <button
                    aria-label="Create new"
                    className="inline-flex items-center justify-center p-[5.9px] rounded-full"
                    style={{
                        /* outer gradient ring */
                        background:
                            "linear-gradient(135deg, #ff4fa1 0%, #8b5cf6 50%, #3b82f6 100%)",
                    }}
                >
                    {/* inner white circle */}
                    <div className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden bg-gray-100">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#6366f1"  // 💡 Use solid color here
        strokeWidth={4}
    >
        <path
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M12 2v20m10-10H2"
        />
    </svg>
</div>


                </button>
                {/* <h2 className="font-bold text-2xl text-gradient-to-r from-fuchsia-500 to-indigo-500 mb-2 bg-clip-text text-transparent">Create New Invoice</h2> */}
                <h2 className="font-bold mt-4 text-3xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent mb-2">
                    Create New Invoice
                </h2>

                <p className="text-sm text-gray-400 mb-4">Start by creating and sending new invoice</p>

            </div>
            <p className="text-sm text-center mt-6 text-purple-600 cursor-pointer hover:underline">
                Or Upload an existing invoice and set payment reminder
            </p>
        </>
    );
}