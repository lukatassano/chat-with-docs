import ParticlesBackground from "@ui/components/particles/ParticlesBackground";
import { Button } from "@ui/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <ParticlesBackground>
      <div className="h-screen flex flex-col items-center justify-center gap-6">
        <div className="text-center font-bold">
          <h1 className="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight sm:text-7xl xl:max-w-[43.5rem]">
            Converse com seus documentos
          </h1>
        </div>
        <div className="max-w-xl text-center font-light">
          <p className="text-zinc-300">
            de forma inteligente e eficiente. O futuro da produtividade está
            aqui.
            <br></br>
            (a IA criou isso 😰)
          </p>
        </div>
        <Link href="/chat">
          <Button className="mt-4">
            Ir para o chat
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </ParticlesBackground>
  );
}
