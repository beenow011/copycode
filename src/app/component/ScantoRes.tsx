'use client';
import { Button } from '@/components/ui/button';
import { Ellipsis, Loader2, LoaderPinwheel } from 'lucide-react';
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import Tesseract, { createWorker } from 'tesseract.js';

function ScantoRes() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [textLoad, setTextLoad] = useState(false);
    const [res, setRes] = useState('');
    const [res2, setRes2] = useState('');
    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropArea, setCropArea] = useState<Area | null>(null);
    const [cropAreaPixel, setCropAreaPixel] = useState<Area | null>(null);

    const run = () => {
        setLoad1(true);
        setLoad2(true);
        fetch('/api/openAimcq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: recognizedText }),
        })
            .then(res => res.json())
            .then(data => {
                setRes2(data.result);
                console.log(data.result);
                setLoad1(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoad1(false);
            });

        fetch('/api/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: recognizedText }),
        })
            .then(res => res.json())
            .then(data => {
                setRes(data.result);
                console.log(data.result);
                setLoad2(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoad2(false);
            });
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const image = event?.target?.files?.[0];
        if (image) {
            setSelectedImage(URL.createObjectURL(image));
        }
    };

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(blob => {
                    if (blob) {
                        setSelectedImage(URL.createObjectURL(blob));
                    }
                });
            }
        }
    };

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        console.log(croppedArea, croppedAreaPixels, "done");
        setCropArea(croppedArea);
        setCropAreaPixel(croppedAreaPixels);
    };

    const startCamera = async () => {
        try {
            setIsCameraOn(true);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            setIsCameraOn(false);
        }
    };

    const recognizeText = () => {
        console.log(2);
        if (selectedImage && cropAreaPixel) {
            setTextLoad(true);
            const image = new Image();
            image.src = selectedImage;
            image.onload = async () => {
                const canvas = document.createElement('canvas');
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                canvas.width = cropAreaPixel.width;
                canvas.height = cropAreaPixel.height;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    console.log(4)
                    ctx.drawImage(
                        image,
                        cropAreaPixel.x * scaleX,
                        cropAreaPixel.y * scaleY,
                        cropAreaPixel.width * scaleX,
                        cropAreaPixel.height * scaleY,
                        0,
                        0,
                        cropAreaPixel.width,
                        cropAreaPixel.height
                    );
                    console.log(5)

                    const base64Image = canvas.toDataURL('image/jpeg');
                    // setSelectedImage(URL.createObjectURL(image));
                    console.log(6)

                    setRecognizedText('');
                    // console.log('Base64 Image:', base64Image);
                    console.log(7)

                    createWorker('eng')
                        .then(worker => {
                            console.log(8);
                            return worker.recognize(base64Image)
                                .then(result => {
                                    console.log(9)
                                    setRecognizedText(result.data.text);
                                    console.log('Recognized Text:', result.data.text);
                                    return worker.terminate();
                                });
                        })
                        .catch(err => {
                            console.error('Error recognizing text:', err);
                        })
                        .finally(() => {
                            setTextLoad(false);
                        });
                }
            };
            image.onerror = (err) => {
                setTextLoad(false);
                console.log(err)
            };
        } else {
            setTextLoad(false);
        }
    };


    return (
        <div className='text-purple-500 px-12 flex flex-col items-center'>
            <p className='text-xl md:text-3xl font-mono font-semibold mb-6 md:mb-12 text-purple-500'>Scan the image and get your answers</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} className='bg-slate-500 p-3 rounded-md mb-2' />
            <div>
                {isCameraOn ? (
                    <div className=''>
                        <div className='w-full flex justify-center items-center gap-2 mb-3'>
                            <Button onClick={handleCapture}>Capture Photo</Button>
                            <Button onClick={stopCamera}>Stop Camera</Button>
                        </div>
                        <video ref={videoRef} autoPlay height={200} width={300} />
                    </div>
                ) : (
                    <Button onClick={startCamera}>Start Camera</Button>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            {selectedImage && (
                <div className='mt-4'>
                    <div className='cropper-container'>
                        <Cropper
                            image={selectedImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <Button onClick={recognizeText}>Scan text</Button>
                </div>
            )}
            <h2>Recognized Text:</h2>


            {textLoad ? (<>
                <Loader2 className='h-6 w-6 animate-spin text-purple-600' />
            </>) : (<p>{recognizedText}</p>)}
            <Button onClick={run} className='my-6' disabled={recognizedText.length === 0}>Search</Button>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-80 md:w-96 bg-slate-600/50 rounded-md p-2'>
                    <div className='flex gap-2'>
                        <p className='text-purple-500 font-bold text-xl'>Gemini</p>
                        <LoaderPinwheel className={`h-6 w-6 ${load1 && 'animate-spin'} text-purple-500`} />
                    </div>
                    {
                        load1 ? <Ellipsis className='h-5 w-6 text-purple-500' /> : (
                            res && <div>
                                <p>{res}</p>
                            </div>
                        )
                    }
                </div>
                <div className='w-80 md:w-96 bg-slate-600/50 rounded-md p-2'>
                    <div className='flex gap-2'>
                        <p className='text-purple-500 font-bold text-xl'>OpenAI</p>
                        <LoaderPinwheel className={`h-6 w-6 ${load2 && 'animate-spin'} text-purple-500`} />
                    </div>
                    {
                        load2 ? <Ellipsis className='h-5 w-6 text-purple-500' /> : (
                            res2 && <div>
                                <p>{res2}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ScantoRes;
