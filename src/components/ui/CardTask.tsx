"use client";

const CardTask = ({ name }: { name: string }) => {
  return (
    <div className="card min-w-48 min-h-24 bg-neutral-300 rounded-xl hover:bg-neutral-300/85 active:bg-neutral-200">
      <p className="font-inter p-2 font-medium select-none ">{name}</p>
    </div>
  );
};

export default CardTask;
