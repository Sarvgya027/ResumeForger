import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getTemplates } from "../api";



const useTemplates = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "templates",
        async () => {
            try {
                const templates = await getTemplates();
                return templates;
            } catch (err) {
                toast.error('Something went wrong');
                throw err; // Rethrow the error to trigger isError
            }
        },
        { refetchOnWindowFocus: false }
    );

    return {
        data,
        isError,
        isLoading,
        refetch
    };
};

export default useTemplates;

