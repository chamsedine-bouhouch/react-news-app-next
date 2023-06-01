import AppLayout from "@/components/Layouts/AppLayout";
import axios from "@/lib/axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Settings() {
    const [preferences, setPreferences] = useState([])
    const [categories, setCategories] = useState([])

    // add form
    const [category, setCategory] = useState(null)
    const [value, setValue] = useState(null)

    const handleAddPreference = (event) => {
        event.preventDefault();
        
        axios.post('api/preferences', { preference_categories_id: category, value: value })
            .then(res => {
                fetchPreferences()
            })


    }

    const fetchPreferences = () => {
        axios.get('/api/preferences')
            .then(response => {
                console.log(response.data.data)
                setPreferences(response.data.data)
            })
            .catch(error => console.error(error))
    }
    const fetchCategories = () => {
        axios.get('/api/preference-categories')
            .then(response => {
                // console.log(response.data.data)
                setCategories(response.data.data)
            }).catch(error => console.error(error))
    }

    useEffect(() => {
        fetchPreferences()
        fetchCategories()
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Settings
                </h2>
            }>
            <Head>
                <title>NG - Settings</title>
            </Head>
            <div className="py-12">


                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Preference</h2>
                            <form onSubmit={handleAddPreference}>
                                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">

                                    <div>
                                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <select id="category" name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            onChange={event => setCategory(event.target.value)}
                                        >
                                            <option value='' disabled>Select category</option>
                                            {categories?.map(category => <option value={category.id} >{category.name} </option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label for="value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preference</label>
                                        <input type="text" name="value" id="value" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Value" required=""
                                            onChange={event => setValue(event.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                            Add
                                        </button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </section>


                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                My Preferences
                                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse the list of your saved preferences.</p>
                            </caption>
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Preference name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {preferences ? (preferences.map((preference) =>
                                    <tr class="bg-white dark:bg-gray-800" key={preference.id}>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {preference.value}
                                        </th>
                                        <td class="px-6 py-4">
                                            {preference.category.name}
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                )) : (<>Empty</>)}


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </AppLayout>
    );
}