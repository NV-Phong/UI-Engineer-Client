export default async function Page({
   params,
}: {
   params: Promise<{ idcollection: string }>;
}) {
   
   const idcollection = (await params).idcollection;


   return <div>My Post: {idcollection}</div>;
}
