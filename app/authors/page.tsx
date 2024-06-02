import db from "@/lib/db";
import CollapsibleUserData from "./_component/collapsible-user-data";

export default async function Authors() {
  const users = await db.user.findMany({
    include: {
      articles: true,
    },
  });
  return (
    <div>
      {users.map((user, index) => (
        <CollapsibleUserData user={user} key={index} />
      ))}
    </div>
  );
}
