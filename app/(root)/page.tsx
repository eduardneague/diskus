import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
    const result = await fetchPosts(1, 30)
    const user = await currentUser()

    return (
      <>
        <section className = "mb-[10rem]">
            <h1 className = "head-text text-white mt-5 md:mt-0">Home</h1>

            <section className = "mt-5 flex flex-col gap-5">
              {result.posts.length === 0 ? 
              (
                <p className = "no-result">No threads found</p>
              ) 
              : 
              (
                <>
                  {result.posts.map((post) => (
                    <ThreadCard
                      key = {post._id}
                      id = {post._id}
                      currentUserId = {user?.id || ""}
                      parentId = {post.parentId}
                      content = {post.text}
                      author = {post.author}
                      community = {post.community}
                      createdAt = {post.createdAt}
                      comments = {post.children}
                    />
                  ))}
                </>
              )
              }
            </section>
        </section>
      </>
    )
}