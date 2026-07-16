function AnalyticsCard({ title, value, icon }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl">{icon}</div>

            <h3 className="text-gray-500 mt-3">
                {title}
            </h3>

            <h1 className="text-3xl font-bold mt-2">
                {value}
            </h1>
        </div>
    );
}

export default AnalyticsCard;