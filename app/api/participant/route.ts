import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

interface Body {
	email: string;
	tel: string;
	name: string;
	surname: string;
	club: string;
	groups: number[];
}
export async function POST(req: Request, res: Response) {
	try {
		const body: Body = await req.json();
		//console.log(body);
		const { email, tel, name, surname, club, groups } = body;
		console.log(email, tel, name, surname, club, groups);

		if (!name || !surname || !groups) {
			return NextResponse.json(
				{ error: "Brakuje Imienia lub nazwiska" },
				{ status: 400 }
			);
		}

		const exist = await prisma.participant.findFirst({
			where: {
				firstName: name,
				lastName: surname,
				club: club,
			},
		});
		console.log(exist);
		if (exist) {
			return NextResponse.json(
				{ error: "Uczestnik o danym nazwisku i imieniu już istnieje" },
				{ status: 409 }
			);
		}

		const newParticipant = await prisma.participant.create({
			data: {
				firstName: name,
				lastName: surname,
				email: email.toLowerCase(),
				phoneNumber: tel,
				club: club,
				participantgroup: {
					create: groups.map((id: number) => ({
						group: { connect: { id: id } },
					})),
				},
			},
			include: {
				participantgroup: true,
			},
		});

		return NextResponse.json(newParticipant);
	} catch (error: any) {
		return Response.json({ error: error.message }, { status: error.code });
	}
}
