"use client";

export default function GenerateMatchesButton({ grupoId }: any) {
  const handleClick = async () => {
    const res = await fetch(`/api/partidos/generar/${grupoId}`, {
      method: "POST",
    });

    const data = await res.json();
    console.log(data);

    if (!data.ok) {
      alert("Error: " + data.message);
      return;
    }

    alert(`Se crearon ${data.total} partidos`);
    //alert(JSON.stringify(data));

    location.reload();
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm bg-black text-white px-3 py-1 rounded"
    >
      Generar partidos
    </button>
  );
}
