import { useCallback, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Simple placeholder "hoodie" shape built from primitives
function HoodieModel({ map }: { map?: THREE.Texture }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.2;
  });

  const fabric = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color("#A0C4FF"), roughness: 0.8, metalness: 0.1 });
    if (map) {
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.repeat.set(1, 1);
      mat.map = map;
      mat.needsUpdate = true;
    }
    return mat;
  }, [map]);

  return (
    <group ref={group} dispose={null}>
      {/* Torso */}
      <RoundedBox args={[1.4, 1.6, 0.9]} radius={0.25} smoothness={4}>
        <meshStandardMaterial attach="material" {...(fabric as any)} />
      </RoundedBox>
      {/* Hood */}
      <RoundedBox args={[1.2, 0.6, 0.9]} position={[0, 1.2, -0.05]} radius={0.25} smoothness={4}>
        <meshStandardMaterial attach="material" color="#6ED3CF" />
      </RoundedBox>
      {/* Sleeves */}
      <RoundedBox args={[0.5, 1.2, 0.6]} position={[-1.0, 0.1, 0]} radius={0.2} smoothness={4}>
        <meshStandardMaterial attach="material" color="#A0C4FF" />
      </RoundedBox>
      <RoundedBox args={[0.5, 1.2, 0.6]} position={[1.0, 0.1, 0]} radius={0.2} smoothness={4}>
        <meshStandardMaterial attach="material" color="#A0C4FF" />
      </RoundedBox>
    </group>
  );
}

type Design3DModalProps = {
  triggerClassName?: string;
};

export default function Design3DModal({ triggerClassName }: Design3DModalProps) {
  const [open, setOpen] = useState(false);
  const [textureUrl, setTextureUrl] = useState<string | null>(null);
  const texture = useTexture(textureUrl || "");

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setTextureUrl(url);
    }
  }, []);

  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setTextureUrl(url);
    }
  }, []);

  const aiPlaceholders = [
    { name: "Anime", colors: ["#FF6F61", "#A0C4FF"] },
    { name: "Floral", colors: ["#6ED3CF", "#FFB84C"] },
    { name: "Geometric", colors: ["#A0C4FF", "#6ED3CF"] },
  ];

  const placeholderTextures = useMemo(() => {
    // procedurally generate small canvas textures as placeholders
    return aiPlaceholders.map((p) => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, p.colors[0]);
      grad.addColorStop(1, p.colors[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      // simple pattern
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * size, Math.random() * size, 8 + Math.random() * 16, 0, Math.PI * 2);
        ctx.fill();
      }
      return canvas.toDataURL();
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" size="lg" className={triggerClassName}>Start Designing</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
        <div
          className="grid md:grid-cols-[1fr_300px] w-full h-[70vh] md:h-[65vh] bg-gradient-to-br from-[#6ED3CF]/50 via-[#A0C4FF]/40 to-[#FFB84C]/40 backdrop-blur rounded-lg"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="relative">
            <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.7} />
              <Environment preset="city" />
              <HoodieModel map={textureUrl ? texture : undefined} />
              <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2} far={2} />
              <OrbitControls enablePan={false} />
            </Canvas>
            <div className="absolute left-4 bottom-4 right-4 flex items-center gap-3">
              <label className="inline-flex px-3 py-2 rounded-full bg-[#FF6F61] text-white text-sm cursor-pointer hover:opacity-90 transition">
                Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
              </label>
              <Button variant="accent" size="sm" onClick={() => setTextureUrl(null)}>Reset Texture</Button>
            </div>
          </div>
          <div className="p-4 md:p-6 space-y-4 bg-white/10 md:bg-white/0">
            <div className="space-y-1">
              <DialogHeader>
                <DialogTitle className="text-xl">AI Design Placeholders</DialogTitle>
              </DialogHeader>
              <p className="text-sm opacity-80">Tap a style to preview. Full AI backend coming soon.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {placeholderTextures.map((src, i) => (
                <button key={i} className="rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-[#FFB84C] transition" onClick={() => setTextureUrl(src)}>
                  <img src={src} className="w-full h-20 object-cover" />
                  <div className="text-xs text-center py-1">{aiPlaceholders[i].name}</div>
                </button>
              ))}
            </div>
            <div className="pt-2 space-y-2">
              <Button variant="secondary" className="w-full">Open Full Studio</Button>
              <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
