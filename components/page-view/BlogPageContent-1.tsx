import { setPosts } from "@/features/posts/postsSlice";
import { RootState } from "@/global-interfaces";
import { PostApiResponse } from "@/services/postService";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronDoubleRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogPostList from "../data-view/BlogPostList";
import JobSortForm from "../forms/JobSortForm";
import SearchForm from "../forms/SearchForm";
import { Page } from "../globals";
import SidebarDesktop from "../ui-ux/SidebarDesktop";
import SidebarNav from "../ui-ux/SidebarNav";
import {
  useGetPostsQuery,
  useLazyGetPostsQuery,
} from "@/features/posts/apiPosts";
import Spinner from "../ui-ux/Spinner";

const BlogPageContent = ({
  initialPosts,
}: {
  initialPosts: PostApiResponse;
}) => {
  const [skipFetching, setSkipFetching] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.postsFilters);

  const {
    data: posts,
    error: postError,
    isLoading: postIsLoading,
  } = useGetPostsQuery(filters, { skip: skipFetching });

  const [getPosts, { data, error, isLoading }] = useLazyGetPostsQuery();
  // console.log("Filters in BlogPageContent", filters);
  const initialMount = useRef(true);

  // KEEP THIS SHIT FOR TESTING
  // const entireState = useSelector((state: RootState) => state);
  // console.log(entireState);

  console.log("Blog Page Posts:", posts);

  useEffect(() => {
    setSkipFetching(false);

    dispatch(setPosts(initialPosts));
    // dispatch(setPosts(initialPosts));
  }, [initialPosts, dispatch]);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      getPosts(filters);
    }
  }, [filters]);

  return (
    <>
      <Head>
        <title>Restaurants</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page FULL customYMargin="my-1" className="">
        <div className="flex">
          {/* MOBILE SIDEBAR WITH SLIDE ACTION */}
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50 lg:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900/80" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button
                          type="button"
                          className="-m-2.5 p-2.5"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                      <div className="flex h-16 shrink-0 items-center">
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        />
                      </div>
                      <SidebarNav />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* DESKTOP SIDEBAR */}
          {/* <div className="bg-gray-900"> */}
          <div className="bg-gradient-to-r from-indigo-50 to-white">
            <SidebarDesktop />
          </div>

          {/* <div className="lg:pl-72"> */}
          <div className="mx-auto flex-grow">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
                <ChevronDoubleRightIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>

              {/* Separator */}
              <div
                className="h-6 w-px bg-gray-900/10 lg:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <SearchForm />

                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  {/* Separator */}
                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/20"
                    aria-hidden="true"
                  />
                  <JobSortForm />
                </div>
              </div>
            </div>

            {/* <main className="pb-10 min-h-full  border-8 border-green-500"> */}
            <main className="pb-10 min-h-full">
              {postIsLoading && <Spinner />}
              <div className="">
                {posts && <BlogPostList posts={posts} />}
                {/* <BlogPostList posts={initialPosts} /> */}
              </div>
            </main>
          </div>
        </div>
      </Page>
    </>
  );
};

export default BlogPageContent;
