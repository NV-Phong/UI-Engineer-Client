export default async function Page({
   params,
}: {
   params: Promise<{ uilibrary: string }>;
}) {
   
   const uilibrary = (await params).uilibrary;


   return <div>My Post: {uilibrary}</div>;
}
