import AppLayout from '@/components/Layouts/AppLayout'
import { useNews } from '@/hooks/news';
import axios from '@/lib/axios';
import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    // const { categories, sources, fetchCategories, fetchSources } = useNews()
    const [category, setCategory] = useState(null);
    const [news, setNews] = useState(null);
    const [keyword, setKeyword] = useState('Apple')

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(keyword)

        fetchNews()

    }
    const fetchNews = async () => {

        await axios.post(`/api/news`, { keyword: keyword, category: category })
            .then(response => setNews(response.data.articles))
            .catch(error => console.error('Error fetching data:', error));

    }
    useEffect(() => {
        // Fetch API data here
        fetchNews()
        // fetchCategories()
        // fetchSources()
    }, []);

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    News Agregator
                </h2>
            }>
            <Head>
                <title>NG - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in
                        </div> */}
                        <form class="flex justify-center" onSubmit={handleSearch}>
                            <input
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                                type="text"
                                name="search"
                                id="search"
                                placeholder="What are you looking for?"
                                className="font-Gotham text-lg placeholder-black text-black w-full text-center"
                            />
                        </form>
                    </div>
                </div>
            </div>


            {/* News map */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 mb-10"
                >
                    {/* card item */}
                    {news ? (news.map((article, key) => <div class="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={article.urlToImage} alt={key} />
                        <div className="px-6 py-4">

                            <Link href={article.url} el="noopener noreferrer" target="_blank"><div class="font-bold text-xl mb-2">{article.title.substring(0, 70).concat('...')}</div></Link>
                            <p className="text-gray-700 text-base">
                                {article.description.substring(0, 100).concat('...')}
                            </p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{article.source.name}</span>
                        </div>
                    </div>)) : (<div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">No Data found</span>
                    </div>)}


                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
