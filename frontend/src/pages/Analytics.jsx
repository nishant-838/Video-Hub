import { useEffect, useState } from "react";
import AnalyticsVideoCard from "../components/AnalyticsVideoCard";
import Layout from "../components/Layout";
import api from "../services/api";
import AnalyticsCard from "../components/AnalyticsCard";

function Analytics() {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/analytics/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAnalytics(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!analytics) return <p>Loading...</p>;

    return (
    <Layout>  
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">
                Analytics
            </h1>

            <div className="grid grid-cols-3 gap-6">
                <AnalyticsCard
                    title="Total Videos"
                    value={analytics.analytics.totalVideos}
                    icon="🎥"
                />

                <AnalyticsCard
                    title="Total Views"
                    value={analytics.analytics.totalViews}
                    icon="👀"
                />

                <AnalyticsCard
                    title="Total Likes"
                    value={analytics.analytics.totalLikes}
                    icon="❤️"
                />
            </div>
        </div>

        <AnalyticsVideoCard
            title="Most Viewed Video"
            video={analytics.topVideo}
        />

        <AnalyticsVideoCard
            title="Latest Uploaded Video"
            video={analytics.latestVideo}
        />
    </Layout>
    );
}

export default Analytics;